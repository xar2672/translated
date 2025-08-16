CREATE EXTENSION IF NOT EXISTS postgis;

DROP TABLE IF EXISTS PESSOA CASCADE;
DROP TABLE IF EXISTS VIAGEM CASCADE;

---

CREATE TABLE PESSOA (
    idPessoa   integer,
    genero     varchar(2),
    raca       varchar(10)
);

CREATE TABLE VIAGEM (
    idViagem      integer,
    idPessoa      integer,
    data          timestamp,
    deslocamento  double precision,
    idOrigem      integer,
    idDestino     integer,
    status        varchar(30),
    motivoStatus  varchar(100),
    remuneracao   money,
    trajeto       jsonb
);

\copy PESSOA FROM '../pessoas.csv' DELIMITER ',' CSV HEADER;
\copy VIAGEM FROM '../viagens.csv' DELIMITER ',' CSV HEADER;
-----
DROP TABLE IF EXISTS PERSON CASCADE; 

CREATE TABLE PERSON (
    idPerson serial PRIMARY KEY,
    gender varchar(2) NOT NULL,
    race varchar(10) NOT NULL
);

INSERT INTO PERSON (idPerson, gender, race)
SELECT
    idPessoa,
    genero,
    raca
FROM public.PESSOA;

DROP TABLE IF EXISTS TARGET_LOCATIONS CASCADE;

CREATE TABLE TARGET_LOCATIONS (
    idLocation bigserial PRIMARY KEY,
    point_geom GEOGRAPHY(Point, 4326) NOT NULL, 
    typeOfLocation varchar(30) NOT NULL CHECK (typeOfLocation IN ('qualquer','estacao'))
);

CREATE INDEX idx_target_locations_coords ON TARGET_LOCATIONS USING GIST (point_geom);

INSERT INTO TARGET_LOCATIONS (idLocation, point_geom, typeOfLocation)
SELECT
    idLocalizacao,
    ST_SetSRID(ST_MakePoint(coordenadas[0], coordenadas[1]), 4326)::geography as point_geom,
    tipoLocalizacao
FROM public.LOCALIZACAO;

DROP TABLE IF EXISTS TRIP CASCADE;

CREATE TABLE TRIP (
    payout money NOT NULL,
    idTrip serial PRIMARY KEY,
    idPerson integer NOT NULL,
    date timestamp NOT NULL,
    distance double precision,
    idOrigin integer,
    idTarget integer,
    status varchar(30) NOT NULL CHECK (status in ('EmAnalise', 'Reprovado','Aprovado')),
    statusReason varchar(100) NOT NULL,
    duration interval,
    payoutLevel double precision,
    meanSpeed double precision
);

INSERT INTO TRIP (payout, idTrip, idPerson, date, distance, idOrigin, idTarget, status, statusReason, payoutLevel)
SELECT
    COALESCE(remuneracao, '0.00'::money) AS remuneracao,
    idViagem,
    idPessoa,
    data,
    deslocamento,
    idOrigem,
    idDestino,
    status,
    motivoStatus,
    ROUND((COALESCE(remuneracao, '0.00'::money)::numeric / NULLIF(deslocamento / 1000.0, 0))::numeric, 2)
FROM public.VIAGEM
WHERE deslocamento > 0;

DROP TABLE IF EXISTS LOCATIONS CASCADE;

CREATE TABLE LOCATIONS (
    idSample serial PRIMARY KEY,             
    idTrip integer NOT NULL REFERENCES TRIP (idTrip), 
    point_geom GEOGRAPHY(Point, 4326) NOT NULL,
    point_timestamp timestamp,
    geohash TEXT,
    mean_speed double precision
);

INSERT INTO LOCATIONS (idTrip, point_geom, point_timestamp)
SELECT
    v.idViagem,
    ST_SetSRID(ST_MakePoint(
        (arr.point_data->'Posicao'->>'longitude')::double precision,
        (arr.point_data->'Posicao'->>'latitude')::double precision
    ), 4326)::geography,
    (arr.point_data->>'Data')::timestamp with time zone
FROM
    public.VIAGEM AS v,
    jsonb_array_elements(v.trajeto) WITH ORDINALITY AS arr(point_data, ordinality) 
WHERE
    v.trajeto IS NOT NULL 
    AND jsonb_typeof(v.trajeto) = 'array'
    AND v.deslocamento > 0
;

UPDATE LOCATIONS
SET geohash = ST_GeoHash(point_geom::geometry, 20);

CREATE INDEX idx_locations_geohash ON LOCATIONS (geohash);

CREATE INDEX idx_locations_point_geom
ON LOCATIONS USING GIST (point_geom);

CREATE INDEX idx_locations_id_trip ON LOCATIONS (idTrip);

UPDATE LOCATIONS AS cur
SET mean_speed = (
  ST_Distance(
    cur.point_geom::geography,
    prev.prev_geom::geography
  )
  /
  NULLIF(
    EXTRACT(
      EPOCH FROM (cur.point_timestamp - prev.prev_ts)
    ),
    0
  )
)
FROM (
  SELECT
    idSample,
    LAG(point_geom) OVER (
      PARTITION BY idTrip
      ORDER BY point_timestamp
    ) AS prev_geom,
    LAG(point_timestamp) OVER (
      PARTITION BY idTrip
      ORDER BY point_timestamp
    ) AS prev_ts
  FROM LOCATIONS
) AS prev
WHERE cur.idSample = prev.idSample
  AND prev.prev_geom IS NOT NULL;

UPDATE LOCATIONS
SET mean_speed = mean_speed * 3.6;

UPDATE LOCATIONS
SET mean_speed = NULL
WHERE mean_speed > 85;


WITH first_points AS (
  SELECT DISTINCT ON (idTrip)
    idTrip,
    point_geom AS first_geom
  FROM LOCATIONS
  ORDER BY idTrip, point_timestamp ASC
),
last_points AS (
  SELECT DISTINCT ON (idTrip)
    idTrip,
    point_geom AS last_geom
  FROM LOCATIONS
  ORDER BY idTrip, point_timestamp DESC
),
trip_endpoints AS (
  SELECT
    fp.idTrip,
    fp.first_geom,
    lp.last_geom
  FROM first_points fp
  JOIN last_points lp ON fp.idTrip = lp.idTrip
)
DELETE FROM LOCATIONS l
USING trip_endpoints te
WHERE
  l.idTrip = te.idTrip
  AND (
    ST_DWithin(l.point_geom, te.first_geom, 300)
    OR
    ST_DWithin(l.point_geom, te.last_geom, 300)
  );


UPDATE TRIP
SET duration = sub.trip_duration
FROM (
    SELECT
        l.idTrip,
        (MAX(l.point_timestamp) - MIN(l.point_timestamp)) AS trip_duration
    FROM
        LOCATIONS l
    GROUP BY
        l.idTrip
) AS sub
WHERE
    TRIP.idTrip = sub.idTrip;

UPDATE TRIP
SET meanSpeed = ROUND(
  ((distance / 1000.0) / NULLIF(EXTRACT(EPOCH FROM duration) / 3600.0, 0))::numeric,
  2
);

DROP TABLE IF EXISTS PESSOA CASCADE;
DROP TABLE IF EXISTS VIAGEM CASCADE;
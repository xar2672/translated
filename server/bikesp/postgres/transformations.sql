CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION tsm_system_rows;
SHOW work_mem;
SHOW shared_buffers;
DROP TABLE IF EXISTS PESSOA CASCADE;
DROP TABLE IF EXISTS VIAGEM CASCADE;

---

CREATE TABLE PESSOA (
    idPessoa   integer,
    genero     varchar(2),
    raca       varchar(10)
);

CREATE TABLE VIAGEM (
    idpessoa      integer,
    remuneracao   money,
    idViagem      integer,
    data          timestamp,
    deslocamento  double precision,
    idOrigem      integer,
    idDestino     integer,
    status        varchar(30),
    motivoStatus  varchar(100),
    trajeto       jsonb
);

\copy PESSOA FROM '/docker-entrypoint-initdb.d/pessoas.csv' DELIMITER ';' CSV HEADER;
\copy VIAGEM FROM '/docker-entrypoint-initdb.d/viagens.csv' DELIMITER ';' CSV HEADER;
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
FROM PESSOA;

DROP TABLE IF EXISTS TRIP CASCADE;

CREATE TABLE TRIP (
    payout money NOT NULL,
    idTrip serial PRIMARY KEY,
    idPerson integer NOT NULL,
    date timestamp NOT NULL,
    distance double precision,
    idOrigin integer,
    idTarget integer,
    status varchar(30) NOT NULL,
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
    0
FROM VIAGEM
WHERE deslocamento > 0 AND status = 'Aprovado' AND data > '2025-07-01'; 

DROP TABLE IF EXISTS LOCATIONS CASCADE;

CREATE TABLE LOCATIONS (
    idLocation serial PRIMARY KEY,             
    point_geom GEOGRAPHY(Point, 4326) NOT NULL,
    geohash TEXT
);

CREATE INDEX idx_location_geom ON LOCATIONS USING GIST (point_geom);
CREATE INDEX idx_location ON LOCATIONS (idLocation);
CREATE UNIQUE INDEX idx_location_geohash ON LOCATIONS (geohash);

CREATE TABLE TRIP_LOCATION (
    idTrip integer NOT NULL REFERENCES TRIP (idTrip),
    idLocation integer NOT NULL REFERENCES LOCATIONS (idLocation),
    point_timestamp timestamp NOT NULL,
    seq serial,
    speed double precision
);

CREATE INDEX idx_trip_id ON TRIP_LOCATION (idTrip);
CREATE INDEX idx_location_id ON TRIP_LOCATION (idLocation);

CREATE TEMP TABLE tmp_raw_points AS
SELECT
    v.idViagem AS idTrip,
    ST_GeoHash(
        ST_SetSRID(ST_MakePoint(
            (arr.point_data->'Posicao'->>'longitude')::double precision,
            (arr.point_data->'Posicao'->>'latitude')::double precision
        ), 4326), 8
    ) AS ghash,
    AVG((arr.point_data->'Posicao'->>'longitude')::double precision) AS lon,
    AVG((arr.point_data->'Posicao'->>'latitude')::double precision) AS lat,
    MAX((arr.point_data->>'Data')::timestamptz) AS ts
FROM VIAGEM v,
     jsonb_array_elements(v.trajeto) AS arr(point_data)
WHERE v.trajeto IS NOT NULL
  AND jsonb_typeof(v.trajeto) = 'array'
  AND v.deslocamento > 0
  AND v.status = 'Aprovado'
  AND v.data > '2025-07-01'
GROUP BY v.idViagem, ghash;

INSERT INTO LOCATIONS (point_geom, geohash)
SELECT
    ST_SetSRID(ST_MakePoint(lon, lat), 4326)::geography,
    ghash
FROM tmp_raw_points ON CONFLICT (geohash) DO NOTHING;;

INSERT INTO TRIP_LOCATION (idTrip, idLocation, point_timestamp)
SELECT
    t.idTrip,
    l.idLocation,
    t.ts
FROM tmp_raw_points t
INNER JOIN LOCATIONS l ON l.geohash = t.ghash;

WITH point_pairs AS (
  SELECT
    tl.idTrip,
    tl.idLocation,
    tl.point_timestamp,
    l.point_geom AS cur_geom,
    LAG(l.point_geom) OVER (PARTITION BY tl.idTrip ORDER BY tl.point_timestamp) AS lgeom,
    LAG(tl.point_timestamp) OVER (PARTITION BY tl.idTrip ORDER BY tl.point_timestamp) AS prev_ts
  FROM TRIP_LOCATION tl
  JOIN LOCATIONS l ON tl.idLocation = l.idLocation
)
UPDATE TRIP_LOCATION cur
SET speed = CASE
    WHEN (ST_Distance(pp.lgeom, pp.cur_geom)
          / NULLIF(EXTRACT(EPOCH FROM (cur.point_timestamp - pp.prev_ts)), 0)
         ) * 3.6 > 70
    THEN 21
    ELSE (ST_Distance(pp.lgeom, pp.cur_geom)
          / NULLIF(EXTRACT(EPOCH FROM (cur.point_timestamp - pp.prev_ts)), 0)
         ) * 3.6
END
FROM point_pairs pp
WHERE cur.idTrip = pp.idTrip
  AND cur.idLocation = pp.idLocation
  AND cur.point_timestamp = pp.point_timestamp
  AND pp.lgeom IS NOT NULL;

CLUSTER LOCATIONS USING idx_location_geom;
    
WITH first_per_trip AS (
  SELECT DISTINCT ON (idTrip) idTrip, idLocation
  FROM TRIP_LOCATION
  ORDER BY idTrip, point_timestamp ASC
),
last_per_trip AS (
  SELECT DISTINCT ON (idTrip) idTrip, idLocation
  FROM TRIP_LOCATION
  ORDER BY idTrip, point_timestamp DESC
),
end_locations AS (
  SELECT
    f.idTrip,
    f.idLocation AS first_id,
    lf.point_geom AS first_geom,
    l.idLocation AS last_id,
    ll.point_geom AS last_geom
  FROM first_per_trip f
  JOIN last_per_trip l USING (idTrip)
  JOIN LOCATIONS lf ON lf.idLocation = f.idLocation
  JOIN LOCATIONS ll ON ll.idLocation = l.idLocation
)
DELETE FROM TRIP_LOCATION tl
USING end_locations e, LOCATIONS l
WHERE tl.idLocation = l.idLocation
  AND tl.idTrip = e.idTrip
  AND (
        ST_DWithin(l.point_geom, e.first_geom, 300)
     OR ST_DWithin(l.point_geom, e.last_geom, 300)
  );

UPDATE TRIP
SET duration = sub.trip_duration
FROM (
    SELECT
        l.idTrip,
        (MAX(l.point_timestamp) - MIN(l.point_timestamp)) AS trip_duration
    FROM
        TRIP_LOCATION l
    GROUP BY
        l.idTrip
) AS sub
WHERE
    TRIP.idTrip = sub.idTrip;

UPDATE TRIP
SET meanSpeed = sub.meanSpeed
FROM (
  SELECT
    t.idTrip as idTrip,
    AVG(l.speed) as meanSpeed
  FROM
    TRIP t
  JOIN TRIP_LOCATION l ON l.idTrip = t.idTrip
  GROUP BY t.idTrip
) AS sub
WHERE sub.idTrip = TRIP.idTrip;

UPDATE TRIP t
SET payoutLevel = ROUND((sub.totalPayout::numeric / LEAST(sub.totalDistance, 16))::numeric, 2)
FROM (
  SELECT
    t2.idPerson,
    date_trunc('day', t2.date) AS trip_day,
    SUM(t2.payout) AS totalPayout,
    SUM(LEAST(t2.distance/1000, 8)) AS totalDistance
  FROM TRIP t2
  WHERE t2.payout::numeric > 0.0
  GROUP BY t2.idPerson, date_trunc('day', t2.date)
) AS sub
WHERE sub.idPerson = t.idPerson
  AND date_trunc('day', t.date) = sub.trip_day;

DROP TABLE IF EXISTS PESSOA CASCADE;
DROP TABLE IF EXISTS VIAGEM CASCADE;
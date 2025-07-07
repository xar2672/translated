CREATE EXTENSION IF NOT EXISTS postgis;

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
    distance double precision NOT NULL CHECK (distance > 0),
    idOrigin integer,
    idTarget integer,
    status varchar(30) NOT NULL CHECK (status in ('EmAnalise', 'Reprovado','Aprovado')),
    statusReason varchar(100) NOT NULL,
    duration interval,
    payoutLevel double precision NOT NULL CHECK (payoutLevel > 0),
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
WHERE remuneracao IS NOT NULL
  AND remuneracao::numeric > 0
  AND deslocamento > 0;

DROP TABLE IF EXISTS LOCATIONS CASCADE;

CREATE TABLE LOCATIONS (
    idSample serial PRIMARY KEY,             
    idTrip integer NOT NULL REFERENCES TRIP (idTrip), 
    point_geom GEOGRAPHY(Point, 4326) NOT NULL,
    next_location integer NOT NULL,
    point_timestamp timestamp
);

CREATE INDEX idx_locations_point_geom
ON LOCATIONS USING GIST (point_geom);

CREATE INDEX idx_locations_id_trip ON LOCATIONS (idTrip);

INSERT INTO LOCATIONS (idTrip, point_geom, next_location, point_timestamp)
SELECT
    v.idViagem,
    ST_SetSRID(ST_MakePoint(
        (arr.point_data->'Posicao'->>'longitude')::double precision,
        (arr.point_data->'Posicao'->>'latitude')::double precision
    ), 4326)::geography,
    (arr.ordinality),
    (arr.point_data->>'Data')::timestamp with time zone
FROM
    public.VIAGEM AS v,
    jsonb_array_elements(v.trajeto) WITH ORDINALITY AS arr(point_data, ordinality) 
WHERE
    v.trajeto IS NOT NULL 
    AND jsonb_typeof(v.trajeto) = 'array'
    AND v.remuneracao IS NOT NULL
    AND v.remuneracao::numeric > 0
    AND v.deslocamento > 0
;

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

SET search_path TO "$user";
DROP SCHEMA public CASCADE;
ALTER SCHEMA bikesp_transformed RENAME TO public;
ALTER ROLE postgres SET search_path TO public, "$user";
SET search_path TO public, "$user";
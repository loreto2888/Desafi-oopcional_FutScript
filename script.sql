-- Script de creación de base de datos para FutScript

-- Crea la base de datos (ejecutar como superusuario si es necesario)
-- CREATE DATABASE futscript;

-- Luego, conectarse a la base de datos futscript y ejecutar el resto del script.

-- Tabla de posiciones
CREATE TABLE IF NOT EXISTS posiciones (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

-- Tabla de equipos
CREATE TABLE IF NOT EXISTS equipos (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

-- Tabla de jugadores
CREATE TABLE IF NOT EXISTS jugadores (
  id SERIAL PRIMARY KEY,
  id_equipos INTEGER NOT NULL REFERENCES equipos(id) ON DELETE CASCADE,
  position INTEGER NOT NULL REFERENCES posiciones(id),
  name VARCHAR(100) NOT NULL
);

-- Algunos datos de ejemplo opcionales
INSERT INTO equipos (name) VALUES ('Real Madrid') ON CONFLICT (name) DO NOTHING;
INSERT INTO equipos (name) VALUES ('Barcelona') ON CONFLICT (name) DO NOTHING;

INSERT INTO posiciones (name) VALUES ('delantero') ON CONFLICT (name) DO NOTHING;
INSERT INTO posiciones (name) VALUES ('centrocampista') ON CONFLICT (name) DO NOTHING;

-- Inserta jugadores de ejemplo si los equipos y posiciones existen
INSERT INTO jugadores (name, position, id_equipos)
SELECT 'Karim Benzema', p.id, e.id
FROM equipos e
JOIN posiciones p ON p.name = 'delantero'
WHERE e.name = 'Real Madrid';

INSERT INTO jugadores (name, position, id_equipos)
SELECT 'Luka Modrić', p.id, e.id
FROM equipos e
JOIN posiciones p ON p.name = 'centrocampista'
WHERE e.name = 'Real Madrid';

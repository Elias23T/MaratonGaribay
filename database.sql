-- ====================================================
-- Sistema de Registro para Maratón - Esquema Supabase
-- Ejecutar en el SQL Editor de Supabase
-- ====================================================

CREATE TABLE IF NOT EXISTS usuarios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre_completo VARCHAR(255) NOT NULL,
  correo VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  estado VARCHAR(50) DEFAULT 'activo',
  fecha_creacion TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS participantes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  numero_corredor VARCHAR(20) UNIQUE NOT NULL,
  categoria CHAR(1) NOT NULL CHECK (categoria IN ('A', 'B')),
  nombre_completo VARCHAR(255) NOT NULL,
  ci VARCHAR(50) NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  celular VARCHAR(20) NOT NULL,
  barrio VARCHAR(255) NOT NULL,
  es_menor BOOLEAN DEFAULT FALSE,
  nombre_tutor VARCHAR(255),
  ci_tutor VARCHAR(50),
  fecha_registro TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_participantes_ci ON participantes(ci);
CREATE INDEX IF NOT EXISTS idx_participantes_nombre ON participantes(nombre_completo);
CREATE INDEX IF NOT EXISTS idx_participantes_categoria ON participantes(categoria);

-- Después de crear las tablas, ejecutar:
-- cd server && node scripts/seedAdmin.js
-- Credenciales: admin@maraton.com / admin123

select * from usuarios";
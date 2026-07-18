# Sistema de Registro para Maratón

Aplicación full-stack para registrar participantes de una maratón.

## Stack

- **Frontend:** React + Vite, React Router, Axios
- **Backend:** Node.js + Express
- **Base de datos:** Supabase (PostgreSQL)
- **Exportación:** jsPDF, xlsx

## Estructura

```
maraton-app/
├── client/          # Frontend React
├── server/          # Backend Express
├── api/             # Entry point para Vercel
├── database.sql     # Esquema de Supabase
└── .env.example     # Variables de entorno
```

## Instalación

### 1. Clonar e instalar dependencias

```bash
npm run install:all
```

### 2. Configurar Supabase

1. Crear proyecto en [Supabase](https://supabase.com)
2. Ejecutar `database.sql` en el SQL Editor
3. Copiar `.env.example` a `.env` en la raíz del proyecto
4. Completar las variables:

```env
SUPABASE_URL=https://TU_PROYECTO.supabase.co
SUPABASE_ANON_KEY=TU_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=TU_SERVICE_ROLE_KEY
JWT_SECRET=tu_clave_secreta_jwt
PORT=3001
VITE_API_URL=http://localhost:3001/api
VITE_SUPABASE_URL=https://TU_PROYECTO.supabase.co
VITE_SUPABASE_ANON_KEY=TU_ANON_KEY
```

### 3. Crear usuario administrador

```bash
cd server
node scripts/seedAdmin.js
```

Credenciales por defecto:
- **Usuario:** admin@maraton.com
- **Contraseña:** admin123

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3001

## API Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /api/auth/login | Iniciar sesión |
| GET | /api/participantes | Listar (query: `busqueda`) |
| GET | /api/participantes/estadisticas | Estadísticas dashboard |
| GET | /api/participantes/:id | Obtener uno |
| POST | /api/participantes | Crear |
| PUT | /api/participantes/:id | Actualizar |
| DELETE | /api/participantes/:id | Eliminar |

## Reglas de negocio

- **Categoría A:** Menores de 18 años (requiere datos del tutor)
- **Categoría B:** 18 años o más
- **Número de corredor:** Auto-generado (MAR-0001, MAR-0002, ...)

## Despliegue en Vercel

1. Conectar repositorio a Vercel
2. Configurar variables de entorno (las mismas del `.env`)
3. `VITE_API_URL` debe apuntar a `/api` en producción
4. Deploy automático con `vercel.json`

## Próximas funcionalidades

El código está preparado para agregar: códigos QR, fotografías, certificados, pagos y más.

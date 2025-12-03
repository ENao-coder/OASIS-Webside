# OASIS Backend API

Backend para el sitio web de OASIS construido con Node.js, Express y Firebase.

## Requisitos Previos

- Node.js (v18 o superior)
- npm o yarn
- Cuenta de Firebase con Firestore habilitado

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
   - Copia `.env.example` a `.env`
   - Completa las variables con tus credenciales de Firebase y JWT secret

```bash
cp .env.example .env
```

## Variables de Entorno

- `PORT`: Puerto del servidor (default: 5050)
- `JWT_SECRET`: Clave secreta para JWT (mínimo 32 caracteres)
- `FIREBASE_PROJECT_ID`: ID del proyecto de Firebase
- `FIREBASE_CLIENT_EMAIL`: Email del cliente de Firebase
- `FIREBASE_PRIVATE_KEY`: Clave privada de Firebase (incluir saltos de línea)

## Estructura del Proyecto

```
src/
├── config/          # Configuración de Firebase
├── controllers/     # Controladores de rutas
├── interfaces/      # Interfaces de datos
├── middleware/      # Middlewares de validación y autenticación
├── models/          # Modelos de datos
├── repositories/    # Capa de acceso a datos
├── routes/          # Definición de rutas
├── schema/          # Esquemas de validación con Zod
├── services/        # Lógica de negocio
└── app.js           # Punto de entrada
```

## Scripts Disponibles

```bash
# Modo desarrollo (con hot reload)
npm run dev

# Modo producción
npm start
```

## API Endpoints

### Admins
- `POST /api/admins/register` - Registrar nuevo admin
- `POST /api/admins/login` - Iniciar sesión
- `POST /api/admins/logout` - Cerrar sesión (requiere auth)
- `GET /api/admins/:id` - Obtener admin (requiere auth)
- `PUT /api/admins/:id` - Actualizar admin (requiere auth)
- `DELETE /api/admins/:id` - Eliminar admin (requiere auth)

### Eventos
- `GET /api/events` - Listar todos los eventos
- `GET /api/events/:id` - Obtener evento específico
- `POST /api/events` - Crear evento (requiere auth)
- `PUT /api/events/:id` - Actualizar evento (requiere auth)
- `DELETE /api/events/:id` - Eliminar evento (requiere auth)

### Proyectos
- `GET /api/projects` - Listar todos los proyectos
- `GET /api/projects/:id` - Obtener proyecto específico
- `POST /api/projects` - Crear proyecto (requiere auth)
- `PUT /api/projects/:id` - Actualizar proyecto (requiere auth)
- `DELETE /api/projects/:id` - Eliminar proyecto (requiere auth)

## Autenticación

Las rutas protegidas requieren un token JWT en el header:
```
Authorization: Bearer <token>
```

## Validación de Datos

Todos los endpoints validan datos usando Zod schemas antes de procesarlos.

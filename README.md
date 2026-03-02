# FutScript API

API REST construida con Node.js, Express y PostgreSQL para la administración de equipos de fútbol, jugadores y sus posiciones. Incluye autenticación con JWT y pruebas automatizadas con Jest y Supertest.

## Características

- Login de administrador con JWT (`POST /login`).
- Gestión de equipos (`GET /equipos`, `POST /equipos`).
- Gestión de jugadores por equipo con INNER JOIN sobre posiciones (`GET /equipos/:teamID/jugadores`, `POST /equipos/:teamID/jugadores`).
- Conexión a base de datos PostgreSQL usando el paquete `pg`.
- Scripts de tests con Jest y Supertest.

## Ejecución rápida

1. Instalar dependencias:
   - `npm install`
2. Configurar variables de entorno para PostgreSQL y `JWT_SECRET`.
3. Ejecutar script de base de datos `script.sql` en la base `futscript`.
4. Iniciar servidor:
   - `npm start`

---

**Autor:** Johanna Barrientos

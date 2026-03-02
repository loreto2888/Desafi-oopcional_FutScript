const { Pool } = require('pg');
require('dotenv').config();

// Puedes configurar tu conexión mediante variables de entorno:
// PGHOST, PGUSER, PGPASSWORD, PGDATABASE, PGPORT
// o usando DATABASE_URL

const connectionString = process.env.DATABASE_URL;

const pool = new Pool(
  connectionString
    ? { connectionString }
    : {
        host: process.env.PGHOST || 'localhost',
        port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
        user: process.env.PGUSER || 'postgres',
        password: process.env.PGPASSWORD || 'postgres',
        database: process.env.PGDATABASE || 'futscript'
      }
);

module.exports = pool;

const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/db');

// Helper para obtener un token válido
async function getValidToken() {
  const response = await request(app)
    .post('/login')
    .send({ username: 'admin', password: '1234' });

  return response.body.token;
}

beforeAll(async () => {
  // Asegurarnos de que la conexión a la BD funcione
  await pool.query('SELECT 1');
});

afterAll(async () => {
  await pool.end();
});

describe('GET /equipos', () => {
  test('Debe responder con un Array y status 200', async () => {
    const response = await request(app).get('/equipos');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('POST /login', () => {
  test('Con credenciales correctas responde con un Object', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'admin', password: '1234' });

    expect(response.status).toBe(200);
    expect(typeof response.body).toBe('object');
    expect(response.body).toHaveProperty('token');
  });

  test('Con credenciales incorrectas responde con status 400', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'admin', password: 'wrong' });

    expect(response.status).toBe(400);
  });
});

describe('POST /equipos/:teamID/jugadores', () => {
  test('Con token válido responde con status 201 al crear jugador', async () => {
    const token = await getValidToken();

    // Primero creamos un equipo para usar su ID
    const equipoResponse = await request(app)
      .post('/equipos')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Equipo Test' });

    expect(equipoResponse.status).toBe(201);

    const teamID = equipoResponse.body.id;

    const jugadorResponse = await request(app)
      .post(`/equipos/${teamID}/jugadores`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Jugador Test', posicion: 'delantero' });

    expect(jugadorResponse.status).toBe(201);
  });
});

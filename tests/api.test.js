// https://dev.to/nedsoft/testing-nodejs-express-api-with-jest-and-supertest-1km6

const request = require('supertest');
const app = require('../app');
let access_token = null;

describe('POST /auth/login', () => {
  test("Return status: 200, a successful message and a JWT type token", async () => {

    const res = await request(app).post('/auth/login')
      .send({
        email: "user.test0@example.com",
        password: "password123"
      });
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('status');
    expect(res.body).toHaveProperty('token');
    access_token = res.body.token;
    expect(res.body.status).toBe(true);
    expect(res.body.message).toBe("Login successful !");
  });

  test("Return status: 401 and a fail message", async () => {

    const res = await request(app).post('/auth/login')
      .send({
        email: "user.test0@example.com",
        password: "password"
      });
    
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('status');
    expect(res.body).toHaveProperty('message');
    expect(res.body.status).toBe(false);
    expect(res.body.message).toBe("Login failed. Email or password doesn't match.");
  });
});

describe('GET /api/v1/users', () => {
  test("Return status: 200 and an array of object data", async () => {
    const res = await request(app).get('/api/v1/users')
      .set('Cookie', [`access_token=${access_token}`]);
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status');
    expect(res.body).toHaveProperty('data');
    expect(res.body.status).toBe(true);
    expect(res.body.data).not.toHaveLength(0);
    
  });
});
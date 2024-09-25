const request = require('supertest');
const app = require('../app'); 

jest.setTimeout(30000);

describe('GET /status and /', () => {
  // Test for /status endpoint
  it('should return the status message for /status', async () => {
    const res = await request(app).get('/status');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'Orderful Application is running');
  });

  // Test for / root endpoint
  it('should return the status message for /', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'Orderful Application is running');
  });

});

const request = require('supertest');
const app = require('../../server/app');
describe('Test the test path', () => {
  test('It should respond with 200', (done) => {
    request(app)
      .get('/test')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

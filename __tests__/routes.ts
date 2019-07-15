import request from 'supertest';
import app from '../src/app';

describe('Test app routes', () => {
  test('Should check if api can be accessed properly', done => {
    request(app)
      .get('/api')
      .then(response => {
        expect(response.status).toBe(200);
        done();
      });
  });

  test('Should check if api cannot be accessed directly on home page', (done: Function) => {
    request(app)
      .get('/')
      .then((response: any) => {
        expect(response.status).toBe(404);
        done();
      });
  });

  test('Should check contacts api', (done: Function) => {
    request(app)
      .get('/api/contacts')
      .then(response => {
        expect(response.status).toBe(200);
        done();
      });
  });
});

describe('Getting Specific data', () => {
  test('Should non-existing throws 404', (done: Function) => {
    request(app)
      .get('/api/contacts/12345678910111213')
      .then(response => {
        expect(response.status).toBe(404);
        done();
      });
  });

  test('Should check if contact can be gotten', (done: Function) => {
    request(app)
      .get('/api/contacts/f47a5456-3a7e-4326-a623-4c604a9080f2')
      .then(response => {
        expect(response.status).toBe(200);
        done();
      });
  });

  test('Should check if contacts can be blocked', (done: Function) => {
    request(app)
      .put('/api/contacts/block/427a8640-e56c-4982-b433-fac142cf2742')
      .then(response => {
        expect(response.status).toBe(200);
        done();
      });
  });

  test('Should check if blocked contact can be read', (done: Function) => {
    request(app)
      .get('/api/contacts/blocked')
      .then(response => {
        expect(response.status).toBe(200);
        done();
      });
  });
});

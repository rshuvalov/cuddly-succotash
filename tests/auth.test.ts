import supertest from 'supertest';
import { app } from '../src/app';

describe('POST /api/v1/auth/sign-in', () => {
  let server;
  let request;

  beforeAll(() => {
    server = app.listen();
    request = supertest(server);
  });

  afterAll(() => {
    server.close();
  });

  it('should return 400 if body is not provided', async () => {
    await request
      .post('/api/v1/auth/sign-in')
      .send({})
      .expect(400)
  });

  it('should return 400 if email not exists', async () => {
    const response = await request
      .post('/api/v1/auth/sign-in')
      .send({ email: 'blabla@blabla.com', password: 'bla' })
      .expect(401);

    expect(response.text).toEqual('User with email blabla@blabla.com not found')
  });

  it('should return token if email and password are right', async () => {
    const response = await request
      .post('/api/v1/auth/sign-in')
      .send({ email: 'random@email.com', password: 'random@email.com' })
      .expect(200);

    expect(response.body.token).not.toBeUndefined()
  });
});

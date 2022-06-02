const request = require('supertest');
const { app, server } = require('../../app/routes');
let { connect, seedUser, clearDatabase, closeDatabase}  = require("../../app/database")

beforeAll(async() => {
    await connect()
    await clearDatabase()
    await seedUser()
});

afterAll(async() => {
    await closeDatabase()
    await server.close();
});

describe('API Security test', () => {
  test('Check that tokens are being authorized appropiately', function (done) {
    
    request("http://localhost:3030")
      .get('/api/bounty/part')
      .set('Set-Cookie: <token>=<token2>; Path=<=/>')
      .send()
    expect(200)
    done()

  });
  test('Check that tokens are being authorized appropiately', async () => {
    
    const res1 = await request("http://localhost:3030")
      .get('/api/bounty/part')
      .set('Cookie', ['token=token2', 'name=GenericUser2'])
    expect(res1.status).toBe(200)
    

  });
    
})
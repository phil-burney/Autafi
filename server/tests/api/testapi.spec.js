const request = require('supertest');
const { app, server } = require('../../app/routes');
const apipartbounty = require("./apipartbounty")
const apipartsale = require("./apipartsale")
const apicarsale = require("./apicarsale")
const apicarbounty = require("./apicarbounty")
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

describe('API test', () => {
    apipartbounty;
    apipartsale;
    apicarsale;
    apicarbounty;
    
    
})
const request = require('supertest');
const { app, server } = require('../app/routes');
const { connectDB, disconnectDB } = require('./database');
const apipartbounty = require("./apipartbounty")
const apipartsale = require("./apipartsale")
const apicarsale = require("./apicarsale")
const apicarbounty = require("./apicarbounty")

beforeAll(async() => {  
    let x = await connectDB();
});

afterAll(() => {
    disconnectDB();
    server.close();
});

describe('API test', () => {

    apipartbounty;
    apipartsale;
    apicarsale
    apicarbounty
})
const request = require('supertest');
const { app, server } = require('../server/app/routes');
const { connectDB, disconnectDB } = require('./database');
const apipartbounty = require("./apipartbounty")
const apipartsale = require("./apipartsale")
const apicarsale = require("./apicarsale")
const apicarbounty = require("./apicarbounty")

beforeAll(async() => {  
   // let x = await connectDB();
});

afterAll(async() => {
    await server.close();
   // await disconnectDB();

    
});

describe('API test', () => {

    apipartbounty;
    apipartsale;
    apicarsale
    apicarbounty
})
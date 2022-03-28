const request = require('supertest');
const { app, server } = require('../index');
const { connectDB, disconnectDB } = require('./database');
const { start } = require('./testSetup');;
const { end } = require('./testTeardown');;
const apipartbounty = require("./apipartbounty")
const apipartsale = require("./apipartsale")
const apicarsale = require("./apicarsale")

beforeAll(() => {
    connectDB();
});

afterAll(() => {
    disconnectDB();
    server.close();
});

describe('API test', () => {

    apipartbounty;
    apipartsale;
    apicarsale
})
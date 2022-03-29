const request = require('supertest');
const { app, server } = require('../index');
const { connectDB, disconnectDB } = require('./database');
const apipartbounty = require("./apipartbounty")
const apipartsale = require("./apipartsale")
const apicarsale = require("./apicarsale")
const apicarbounty = require("./apicarbounty")

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
    apicarbounty
})
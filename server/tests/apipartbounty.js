const request = require('supertest');
const { connectDB, disconnectDB } = require('./database');
const { app, server } = require('../index');

const partBountyContent = {
    title: "New Parts",
    year: "1979",
    make: "Ford",
    model: "Bronco",
    part: "Engine",
    description: "I need a new engine.  Mine blew up",
    bounty: 600,
    email: "peburney@gmail.com"
}
const partBountyContent2 = {
    title: "New Parts",
    year: "1969",
    make: "Chevrolet",
    model: "Camaro",
    part: "Engine",
    description: "I need a new engine.  Mine blew up",
    bounty: 600,
    email: "peburney@ymail.com"
}


let y = describe('API test', () => {


    test('POST /api/partbounty', async() => {
        console.log('boo')
        const res = await request("http://localhost:3030").post('/api/partbounty').send(
            JSON.stringify(partBountyContent)

        ).set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        expect(res.status).toBe(200);

    });

    test('GET /api/partbounty', async() => {

        const res = await request("http://localhost:3030")
            .get('/api/partbounty')

        expect(res.status).toBe(200)
        expect(databaseQueryParts([partBountyContent], res.body)).toBe(true)

    });

    test('POST /api/partbounty', async() => {
        const res = await request("http://localhost:3030").post('/api/partbounty').send(
            JSON.stringify(partBountyContent2)

        ).set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toBe(200);

    });
    test('GET /api/partbounty', async() => {

        const res = await request("http://localhost:3030")
            .get('/api/partbounty')

        expect(res.status).toBe(200)
        expect(databaseQueryParts([partBountyContent, partBountyContent2], res.body)).toBe(true)

    });

});
function databaseQueryParts(sentParts, recievedParts) {
    for (let i = 0; i < sentParts.length; i++) {
        if (!partCompFunction(sentParts[i], recievedParts[i])) {
            return false
        }
    }
    return true
}
function partCompFunction(sentPart, recievedPart) {
    return sentPart.title == recievedPart.title
        && sentPart.year == recievedPart.year
        && sentPart.make == recievedPart.make
        && sentPart.model == recievedPart.model
        && sentPart.part == recievedPart.part
        && sentPart.description == recievedPart.description
        && sentPart.bounty == recievedPart.bounty
        && sentPart.salePrice == recievedPart.salePrice
        && sentPart.email == recievedPart.email

}
module.exports = {y}
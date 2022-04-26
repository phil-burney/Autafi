const request = require('supertest');
const { app, server } = require('../server/app/routes');

const carBountyContent = {
    title: "New Part",
    year: "1979",
    make: "Ford",
    model: "Bronco",
    description: "I need a new bronco.  Mine blew up",
    bounty: 600,
    email: "peburney@gmail.com"
}
const carBountyContent2 = {
    title: "New Parts",
    year: "1979",
    make: "Ford",
    model: "Mustang",
    description: "I need a new mustang.  Mine blew up",
    bounty: 600,
    email: "peburney@gmail.com"
}
let exp = describe('API test', () => {


    test('POST /api/bounty/car', async () => {

        const res = await request("http://localhost:3030").post('/api/bounty/car').send(
            JSON.stringify(carBountyContent)

        ).set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toBe(200);
    });


    test('GET /api/bounty/car', async () => {

        const res = await request("http://localhost:3030")
            .get('/api/bounty/car')

        expect(res.status).toBe(200)
        expect(databaseQueryCars([carBountyContent], res.body)).toBe(true)
    })


    test('POST /api/bounty/car', async () => {

        const res = await request("http://localhost:3030").post('/api/bounty/car').send(
            JSON.stringify(carBountyContent2)

        ).set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toBe(200);
    });

    test('GET /api/bounty/car', async () => {

        const res = await request("http://localhost:3030")
            .get('/api/bounty/car')

        expect(res.status).toBe(200)
        expect(databaseQueryCars([carBountyContent, carBountyContent2], res.body)).toBe(true)
    })
});


function databaseQueryCars(sentCars, recievedCars) {
    for (let i = 0; i < sentCars.length; i++) {
        if (!carCompFunction(sentCars[i], recievedCars[i])) {
            return false
        }
    }
    return true;
}

function carCompFunction(sentCar, recievedCar) {
    return sentCar.title == recievedCar.title
        && sentCar.year == recievedCar.year
        && sentCar.make == recievedCar.make
        && sentCar.model == recievedCar.model
        && sentCar.description == recievedCar.description
        && sentCar.bounty == recievedCar.bounty
        && sentCar.salePrice == recievedCar.salePrice
        && sentCar.email == recievedCar.email
}
module.exports = {exp}
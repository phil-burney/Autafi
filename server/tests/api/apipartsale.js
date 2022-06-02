const request = require('supertest');

const partSaleContent = {
    title: "New Parts",
    year: "1979",
    make: "Ford",
    model: "Bronco",
    description: "part for sale!",
    part: "Engine",
    salePrice: 60000,
    email: "peburney@gmail.com"
}
const partSaleContent2 = {
    title: "New Parts",
    year: "1969",
    make: "Chevrolet",
    model: "Camaro",
    description: "part for sale!",
    part: "Transmission",
    salePrice: 600,
    email: "peburney@ymail.com"
}

let x = describe('API test', () => {


    test('POST /api/sale/part', async() => {

        const res = await request("http://localhost:3030").post('/api/sale/part').send(
            JSON.stringify(partSaleContent)

        ).set('Content-Type', 'application/json')
            .set('Accept', 'application/json')


    });

    test('GET /api/sale/part', async() => {

        const res = await request("http://localhost:3030")
            .get('/api/sale/part')

        expect(res.status).toBe(200)
        expect(databaseQueryParts([partSaleContent], res.body)).toBe(true)

    });

    test('POST /api/sale/part', async() => {

        const res = await request("http://localhost:3030").post('/api/sale/part').send(
            JSON.stringify(partSaleContent2)

        ).set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toBe(200);

    });
    test('GET /api/sale/part', async() => {

        const res = await request("http://localhost:3030")
            .get('/api/sale/part')

        expect(res.status).toBe(200)
        expect(databaseQueryParts([partSaleContent, partSaleContent2], res.body)).toBe(true)

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
module.exports = {x}
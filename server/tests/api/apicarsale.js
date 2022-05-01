const request = require('supertest');
const fs = require('fs-extra');

const carSaleContent = {
    title: "New Parts",
    year: "1979",
    make: "Ford",
    model: "Bronco",
    description: "Car for sale!",
    salePrice: 60000,
    email: "peburney@gmail.com"
}
const carSaleContent2 = {
    title: "New Parts",
    year: "1969",
    make: "Chevrolet",
    model: "Camaro",
    description: "Car for sale!",
    salePrice: 600,
    email: "peburney@ymail.com"
}
const carSaleContent3 = {
    title: "New Parts",
    year: "1979",
    make: "Ford",
    model: "Bronco",
    description: "Car for sale!",
    salePrice: 700,
    email: "peburney@ymail.com"
}

let exp = describe('API test', () => {


    test('POST /api/sale/car', async () => {

        const res = await request("http://localhost:3030").post('/api/sale/car')
            .field("title", "New Parts")
            .field("year", "1979")
            .field("make", "Ford")
            .field("model", "Bronco")
            .field("description", "Car for sale!")
            .field("salePrice", 60000)
            .field("email", "peburney@gmail.com")

    });

    test('GET /api/sale/car', async () => {

        const res = await request("http://localhost:3030")
            .get('/api/sale/car')

        expect(res.status).toBe(200)
        expect(databaseQueryCars([carSaleContent], res.body)).toBe(true)

    });

    test('POST /api/sale/car', async () => {
        const res = await request("http://localhost:3030").post('/api/sale/car').field("title", "New Parts")
        .field("year", "1969")
        .field("make", "Chevrolet")
        .field("model", "Camaro")
        .field("description", "Car for sale!")
        .field("salePrice", 600)
        .field("email", "peburney@ymail.com")

        expect(res.status).toBe(200);

    });
    test('POST /api/sale/car with image', async () => {

        const res = await request("http://localhost:3030").post('/api/sale/car')

            .field("title", "New Parts")
            .field("year", "1979")
            .field("make", "Ford")
            .field("model", "Bronco")
            .field("description", "Car for sale!")
            .field("salePrice", 700)
            .field("email", "peburney@ymail.com")
            .attach("photo", fs.createReadStream(__dirname + "/img/bronco.jpg"))

        expect(res.status).toBe(200);

    });
    test('GET /api/sale/car', async () => {

        const res = await request("http://localhost:3030")
            .get('/api/sale/car')

        expect(res.status).toBe(200)
        expect(databaseQueryCars([carSaleContent, carSaleContent2, carSaleContent3], res.body)).toBe(true)

    });

});
function databaseQueryCars(sentParts, recievedParts) {
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
module.exports = { exp }
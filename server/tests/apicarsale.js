const request = require('supertest');
const FormData = require('form-data');
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
let formPacket = new FormData()
    console.log(this.packet)
    formPacket.append("title", "New Parts")
    formPacket.append("year", "1979")
    formPacket.append("make", "Ford")
    formPacket.append("model", "Bronco")
    formPacket.append("description", "Car for sale!")
    formPacket.append("salePrice", 700)
    formPacket.append("email", "peburney@ymail.com")
    formPacket.append("photo", fs.createReadStream(__dirname + "/img/bronco.jpg"))



let exp = describe('API test', () => {


    test('POST /api/sale/car', async () => {

        const res = await request("http://localhost:3030").post('/api/sale/car').send(
            JSON.stringify(carSaleContent)

        ).set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toBe(200);

    });

    test('GET /api/sale/car', async () => {

        const res = await request("http://localhost:3030")
            .get('/api/sale/car')

        expect(res.status).toBe(200)
        expect(databaseQueryCars([carSaleContent], res.body)).toBe(true)

    });

    test('POST /api/sale/car', async () => {
        const res = await request("http://localhost:3030").post('/api/sale/car').send(
            JSON.stringify(carSaleContent2)

        ).set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toBe(200);

    });
    test('POST /api/sale/car with image', async () => {
        const res = await request("http://localhost:3030").post('/api/sale/car').send({
            method: "POST",
            mode: "cors",
            credentials: "include",
            body: formPacket
        })

        expect(res.status).toBe(200);

    });
    test('GET /api/sale/car', async () => {

        const res = await request("http://localhost:3030")
            .get('/api/sale/car')

        expect(res.status).toBe(200)
        expect(databaseQueryCars([carSaleContent, carSaleContent2], res.body)).toBe(true)

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
const CarSale = require('../../models/carsales')
const fs = require('fs-extra');
const path = require('path');

exports.newCarSale = async function (req, res) {
    const newcar = new CarSale({
        title: req.body.title,
        year: req.body.year,
        make: req.body.make,
        model: req.body.model,
        description: req.body.description,
        salePrice: req.body.salePrice,
        images: req.body.photos,
        email: req.body.email,
    });
    if (req.body.dest) {
        let dir = path.join(global.__basedir + '/uploads/car/sale/' + newcar._id)
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.move(req.body.dest, dir, { overwrite: true }, () => {
            fs.readdirSync(dir).forEach((img) => {
                newcar.images.push(process.env.THIS_URL + '/car/sale/' + newcar._id + '/' + img)
            })

        })

    }
    newcar.save()
        .then(() => {
            res.status(200).send({ message: 'Car successfully entered' });
        })
        .catch((err) => {
            console.log(err);
        })
}
exports.getAllCarSales = async function (req, res) {

    CarSale.find()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            console.log(err);
        })
}
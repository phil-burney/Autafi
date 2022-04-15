const CarBounty = require('../../models/carbounty')
const fs = require('fs-extra');
const path = require('path');

exports.newCarBounty = async function (req, res) {

    //Currently only posting car to database without image
    const newcar = new CarBounty({
        title: req.body.title,
        year: req.body.year,
        make: req.body.make,
        model: req.body.model,
        description: req.body.description,
        bounty: req.body.bounty,
        images: req.body.photos,
        email: req.body.email,
    });
    if (req.body.dest) {
        let dir = path.join(global.__basedir + '/uploads/car/bounty/' + newcar._id)
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.move(req.body.dest, dir, { overwrite: true }, () => {
            fs.readdirSync(dir).forEach((img) => {
                newcar.images.push(process.env.THIS_URL + '/car/bounty/' + newcar._id + '/' + img)
            })

        })
    }
    newcar.save()
        .then(() => {
            // send back response
            res.status(200).send({ message: 'Part successfully entered' });
        })
        .catch((err) => {
            console.log(err);
        })

}
exports.getAllCarBounties = async function (req, res) {
    CarBounty.find()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            console.log(err);
        })
}
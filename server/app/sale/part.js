const PartSale = require('../../models/partsales');
const fs = require('fs-extra');
const path = require('path');

exports.newPartSale = async function (req, res) {


    const newpart = new PartSale({
        title: req.body.title,
        year: req.body.year,
        make: req.body.make,
        model: req.body.model,
        part: req.body.part,
        description: req.body.description,
        salePrice: req.body.salePrice,
        images: req.body.photos,
        email: req.body.email,
    });
    if (req.body.dest) {
        let dir = path.join(global.__basedir + '/uploads/part/sale/' + newpart._id)
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.move(req.body.dest, dir, { overwrite: true }, () => {
            fs.readdirSync(dir).forEach((img) => {
                newpart.images.push(process.env.THIS_URL + '/part/sale/' + newpart._id + '/' + img)
            })

        })
    }
    newpart.save()
        .then(() => {
            res.status(200).send({ message: 'Part successfully entered' });
        })
        .catch((err) => {
            console.log(err);
        })

}
exports.getAllPartSales = async function (req, res) {

    PartSale.find({}).exec(function (error, posts) {
        res.send(posts);
    })
}
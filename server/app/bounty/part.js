const PartBounty = require('../../models/partbounty')
const fs = require('fs-extra');
const path = require('path');

exports.newPartBounty = async function (req, res) {
    const newpart = new PartBounty({
        title: req.body.title,
        year: req.body.year,
        make: req.body.make,
        model: req.body.model,
        part: req.body.part,
        description: req.body.description,
        bounty: req.body.bounty,
        email: req.body.email,
    });
    if (req.body.dest) {
        let dir = path.join(global.__basedir + '/uploads/part/bounty/' + newpart._id)
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.move(req.body.dest, dir, { overwrite: true }, () => {
            fs.readdirSync(dir).forEach((img) => {
                newpart.images.push(process.env.THIS_URL + '/part/bounty/' + newpart._id + '/' + img)
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

exports.getAllPartBounties = async function (req, res) {
    PartBounty.find()

        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            console.log(err);
        })
}
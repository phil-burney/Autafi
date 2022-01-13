const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const partSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    part: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    salePrice: {
        type: Number,
        required: true
    },
    images: {
        type: [String]
    }
}, {

},
{ timestamps: true });

const PartSale = mongoose.model('partsale', partSchema);
module.exports = PartSale;
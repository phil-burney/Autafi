const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
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
}, { timestamps: true });
carSchema.statics.getPostsByEmail = async function (name) {
    return await CarSale.find({name})
}
const CarSale = mongoose.model('carsale', carSchema);
module.exports = CarSale;
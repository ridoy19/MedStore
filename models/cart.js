const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    brandName: {
        type: String,
        required: true
    },
    dosageType:  {
        type: String,
        required: true
    },
    manufacturer:  {
        type: String,
        required: true
    },
    price: Number,
    total: Number,
    count: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Cart', CartSchema);
module.exports = CartSchema;
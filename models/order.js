const mongoose = require('mongoose');
const CartSchema = require('./cart');

const OrderSchema = new mongoose.Schema({
    products: [CartSchema],
    transaction_id: {},
    subtotal: {
        type: Number
    },
    shipping_address: {
        type: String,
        // required: true
    },
    status: {
        type: String,
        default: "Not processed",
        enum: ["Not processed", "Processing", "Delivered", "Cancelled"] // enum means string objects
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Order', OrderSchema);
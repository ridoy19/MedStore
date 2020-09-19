const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    manufacturer: {
        type: String,
        required: true
    },
    brandName: {
        type: String,
        required: true
    },
    genericName: {
        type: String,
        required: true
    },

    // image: {
    //     type: String,
    //     required: true
    // },
    strength: {
        type: String,
        required: true
    },
    dosageType: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0,
        required: true
    },
    countInStock: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})



module.exports = mongoose.model('Product', ProductSchema);
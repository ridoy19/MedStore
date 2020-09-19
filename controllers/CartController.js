const Cart = require('../models/cart')
const mongoose = require('mongoose');

const getCart = async (req, res, next) => {
    const {
        cartId
    } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            return res.status(422).send({
                message: `Porvided id is not valid`
            })
        }
        const foundCart = await Cart.findOne({
            _id: cartId
        })
        //.populate('items.product');

        if (!foundCart) {
            return res.status(404).send({
                message: `Not cart found! :(`
            })
        }
        return res.send({
            data: foundCart
        })
    } catch (error) {
        next(error);
    }
}


const addToCart = async (req, res, next) => {

    try {
        const item = {
            product: req.body.product,
            quantity: req.body.quantity
        };

        const savedCart = await Cart.create({
            // user: user,
            items: [item]
        })
        return res.send({
            message: `Cart saved successfully`,
            data: savedCart
        })
    } catch (error) {
        next(error)
    }
}
// Add item to specific cart
const updateCart = async (req, res, next) => {

    try {
        const {
            cartId
        } = req.params;
        const item = {
            product: req.body.product,
            quantity: req.body.quantity
        };
        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            return res.status(422).send({
                message: `Provied id not valid`
            })
        }


        const foundCart = await Cart.findOne({
            // user: user
            _id: cartId
        });
        if (foundCart) {
            let products = foundCart.items.map(item => item.product + '');
            if (products.includes(item.product)) {
                const savedCart = await Cart.findOneAndUpdate({
                    // user: user,
                    _id: cartId,
                    items: {
                        $elemMatch: {
                            product: item.product
                        }
                    }
                }, {
                    $inc: {
                        'items.$.quantity': item.quantity
                    }
                });
                return res.send({
                    data: savedCart
                })
            } else {
                foundCart.items.push(item);
                foundCart.save();
                return res.send({
                    data: foundCart
                })
            }
        } else {
            const savedCart = await Cart.create({
                // user: user,
                items: [item]
            })
            return res.send({
                data: savedCart
            })
        }
    } catch (error) {
        next(error)
    }
}


const removeCartItem = async (req, res, next) => {
    try {
        const {
            productId,
            cartId
        } = req.params;

        const foundCart = await Cart.findOne({
            _id: cartId
        });
        if (!mongoose.Types.ObjectId.isValid(cartId) || !mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(422).send({
                message: `Provied id not valid`
            })
        }
        // if (foundCart) {
        //     foundCart.items = foundCart.items.filter(item => item._id !== productId);
        //     await foundCart.save();
        // }
        const updatedCart = await Cart.updateOne({
            _id: cartId
        }, {
            $pull: {
                'items.$.product': productId
            }
        });

        return res.send({
            success: true,
            message: `Item removed successfully`,
            data: updatedCart
        })
        // await Cart.updateOne(query, {
        //     $pull: {
        //         products: product
        //     }
        // }).exec(err => {
        //     if (err) {
        //         return res.status(400).json({
        //             error: 'Your request could not be processed. Please try again.'
        //         });
        //     }
        //     res.status(200).json({
        //         success: true
        //     });
        // });
    } catch (error) {
        next(error);
    }
}


const deleteCart = async (req, res, next) => {
    try {
        const {
            cartId
        } = req.params.cartId;
        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            return res.status(422).send({
                message: `Provied id not valid`
            })
        }
        const foundCart = await Cart.find({
            _id: cartId
        })
        if (!foundCart) {
            return res.status(404).send({
                message: `No cart found`
            })
        }
        await Cart.deleteOne({
            _id: cartId
        })
        return res.send({
            message: `Successfully deleted~`
        })
    } catch (error) {
        next(error)
    }
}

const deleteAllCart = async (req, res, next) => {
    try {
        try {
            await Cart.deleteMany();
            return res.send({
                message: `Deleted all`,
                success: true
            })
        } catch (error) {
            next(error)
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getCart,
    deleteAllCart,
    deleteCart,
    removeCartItem,
    updateCart,
    addToCart,
    getCart
}
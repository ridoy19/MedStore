const Order = require('../models/order');
const User = require('../models/user');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer')
const SMTPTransport = require('nodemailer/lib/smtp-transport');
const { createInvoice } = require('../utils/generatePDF');
// export const addOrder = async (req, res, next) => {
//     try {
//         const cart = req.body.cartId;
//         const total = req.body.total;
//         const user = req.user._id;

//         const order = new Order({
//             cart,
//             user,
//             total
//         });
//         const savedOrder = await Order.save(order).populate('cart user', '-password');
//         // const foundOrder = await Order.findById(savedOrder._id).populate('cart user', '-password');
//         // const foundCart = await Cart.findById(foundOrder._id).populate({
//         //     path: 'items.product'
//         // })
//         res.status(200).json({
//             success: true,
//             message: `Your order has been placed successfully!`,
//             data: {
//                 savedOrder
//             }
//         });
//     } catch (error) {
//         next(error)
//     }
// }


// export const getAllOrder = async (req, res, next) => {
//     try {
//         await Order.find({user: req.user._id})
//     } catch (error) {
//         next(error)
//     }
// }
const fs = require('fs')
const path = require('path')

const sendEmail = async (recipent, order) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport(new SMTPTransport({
        name: process.env.SMTP_HOST,
        host: process.env.SMTP_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASS,
        },
    }));

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"Botomul 👻" <${process.env.SMTP_EMAIL}>`, // sender address
        to: `${recipent}, ${process.env.SMTP_EMAIL}`, // list of receivers
        subject: `Order Confirmation ${order._id} ✔`, // Subject line
        text: `Hello, ${order.user.name}. Your order has been recieved.\n\n.
                We will contact you as soon as possible.\n`, // plain text body
        html: `Hello, <b>${order.user.name}</b>. Your order has been recieved.\n\n.
                We will contact you as soon as possible.\n`, // html body
        attachments: [
            {
                filename: 'invoice.pdf',
                path: 'invoice/invoice.pdf'
            }
        ]
    });
}


const placeOrder = async (req, res, next) => {
    console.log('Order ', req.body)
    try {
        // const {products, transaction_id, amount,shipping_address} = req.body
        // const order = new Order({
        //     products,
        //     transaction_id,
        //     amount,
        //     shipping_address,
        //     user: req.userInfo
        // });
        // const savedOrder = await order.save();
        // //savedOrder.user = req.userInfo;
        // res.send({
        //     success: true,
        //     data: savedOrder
        // })
        req.body.order.user = req.userInfo
        const order = new Order(req.body.order);
        const savedOrder = await order.save()
            .then(order => order.populate('user', '_id name email').execPopulate());
        // console.log(req.userInfo.email)
        const foundUser = await User.findById({
            _id: req.userInfo._id
        })
        foundUser.order_history.push(savedOrder)
        await foundUser.save();
        // console.log(savedOrder)
        createInvoice(savedOrder, 'invoice.pdf');
        sendEmail(req.userInfo.email, savedOrder)

        res.status(201).send({
            success: true,
            message: `Thanks for your order. Your order has been placed successfully!`,
            data: savedOrder
        })
    } catch (error) {
        next(error)
    }

}

const listOrders = async (req, res, next) => {
    try {
        const allOrders = await Order.find({})
            .populate('user', '_id name address')
            .sort({
                createdAt: -1
            });
        if (allOrders.length === 0) {
            res.status(204).send({
                message: `No orders recorded!`
            })
        }
        res.send({
            data: allOrders
        })
    } catch (error) {
        next(error)
    }

}


const updateOrder = async (req, res, next) => {
    try {
        const {
            orderId
        } = req.params;
        const {
            products,
            shipping_address,
            phone,
            paymentMethod,
            status
        } = req.body;
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(422).send({
                message: `Provided id is not valid!`
            })
        }

        if (!status || !shipping_address || !phone || !paymentMethod) {
            res.status(400).send({
                success: false,
                message: `All field must have value provided!`
            })
        }
        const update = {
            //    products: products,
            // shipping_address: shipping_address,
            status: status
        }
        const foundOrder = await Order
            .findById({
                _id: orderId
            })
        console.log(foundOrder)
        if (!foundOrder) {
            return res.status(404).send({
                message: `No order recorded with the id!`
            })
        }

        if (!foundOrder.user.equals(req.userInfo._id) && req.userInfo.isAdmin !== 1) {
            res.status(401).send({
                message: `Not authorized to perform the action`
            })
        }
        await Order.updateOne({
            _id: orderId
        }, update, {
            new: true,
            upsert: true,
            runValidators: true
        })

        return res.send({
            message: `Order updated successfully!`
        })
    } catch (error) {
        next(error)
    }
}


const getSingleOrder = async (req, res, next) => {
    try {
        const {orderId} = req.params;
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(422).send({
                message: `Provided id is not valid!`
            })
        }
        const foundOrder = await Order.findOne({_id: orderId});
        
        if (!foundOrder) {
            res.status(404).send({
                message: `Order not found!`
            })
        }
        if (!foundOrder.user.equals(req.userInfo._id) && req.userInfo.isAdmin !== 1) {
            res.status(403).send({
                message: `Not authorized to perform the action!`
            })
        }
        res.send({
            data: foundOrder
        })

    } catch (error) {
        next(error)
    }
}


const deleteOrder = async (req, res, next) => {
    try {
        const {orderId} = req.params;
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            res.status(422).send({
                message: `Provided id is not valid!`
            })
        }
        const foundOrder = await Order.findById({
            _id: orderId
        })
        if (!foundOrder) {
            res.status(404).send({
                message: `No order found~`
            })
        }
        // const foundUser = await User.findById({
        //     _id: foundOrder.user
        // })
        // // Checking if the logged user is not the owner of the post
        // if (!foundOrder.user.equals(req.userInfo._id) && req.userInfo.isAdmin !== 1) {
        //     res.status(403).send({
        //         message: `Not authorized to perform the action!`
        //     })
        // }
        const deletedItem = await Order.deleteOne({
            _id: orderId
        })

        // await foundUser.order_history.pull(orderId)
        // await foundUser.save()

        res.json({
            message: `Order deleted successfully!`
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    placeOrder,
    listOrders,
    updateOrder,
    getSingleOrder,
    deleteOrder
}
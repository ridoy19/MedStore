const User = require('../models/user');
const mongoose = require('mongoose');
const expressJWT = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');

const getUser = async (req, res, next) => {
    try {
        const response = await User.find({}).select('-password -__v');
        if (response.length === 0) {
            return res.status(204).send({
                message: `No user found`
            })
        }
        return res.send({
            data: response
        })
    } catch (error) {
        next(error);
    }
}

const findUserById = async (req, res, next) => {
    try {
        const { userId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(422).send({
                success: false,
                message: `Provided is not valid!`
            })
        }

        const foundUser = await User.findById({_id: userId}).select('-password -__v');
        if (!foundUser) {
            return res.status(404).send({
                message: `No user found!`
            })
        }
        return res.send({
            success: true,
            data: foundUser
        })
    } catch (error) {
        next(error)
    }
}

const removeUserById = async (req, res, next) => {
    try {
        const {
            userId
        } = req.params;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(422).send({
                message: `Provided id not valid`
            })
        }
        const foundUser = await User.find({
            _id: userId
        });
        if (!foundUser) {
            return res.status(404).send({
                message: `User not found~`
            })
        }
        await User.deleteOne({
            _id: userId
        });
        return res.send({
            message: 'User deleted successfully~'
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getUser,
    findUserById,
    removeUserById
}
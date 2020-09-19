const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const expressJWT = require('express-jwt');

const signup = async (req, res, next) => {
    try {
        const {
            email,
            name,
            password,
            address,
            phone,
            isAdmin
        } = req.body;
        const foundUser = await User.findOne({
            email: email
        });
        if (foundUser) {
            return res.status(409).send({
                success: false,
                message: `User with the email already exists!`
            })
        }
        const user = new User({
            email,
            name,
            password,
            address,
            phone,
            isAdmin
        })
        const savedUser = await user.save(user);
        return res.status(201).send({
            success: true,
            message: `User created successfully!`,
            data: savedUser
        })
    } catch (error) {
        next(error);
    }
}


const signin = async (req, res, next) => {
    try {
        const {
            email,
            password
        } = req.body;
        const foundUser = await User.findOne({
            email: email
        });
        if (!foundUser) {
            return res.status(404).send({
                message: `No user found! Signup instead.`
            })
        } else {
            const isEqual = await bcrypt.compare(password, foundUser.password);
            if (!isEqual) {
                return res.status(401).send({
                    success: false,
                    message: `Wrong credentials. Check email and password again!`
                })
            }

            const token = await jwt.sign({
                email: foundUser.email,
                name: foundUser.name,
                isAdmin: foundUser.isAdmin,
                _id: foundUser._id.toString()
            }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            })

            // persist the token as 'token' in cookie with expiry date
            // set the cookie for 1 hour of expiration
            res.cookie('rember_user', {
                expires: new Date() + 3600000
            })

            const {
                _id,
                email,
                name,
                isAdmin
            } = foundUser;

            return res.send({
                token: token,
                user: {
                    _id,
                    email,
                    name,
                    isAdmin
                }
            })
        }


    } catch (error) {
        next(error);
    }
}


const signout = async (req, res, next) => {
    try {
        res.clearCookie('rember_user');
        return res.send({
            success: true,
            message: `Signout successful!`
        })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    signin,
    signup,
    signout
}
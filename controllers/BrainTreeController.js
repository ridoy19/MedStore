const User = require('../models/user');
const braintree = require('braintree');


const generateToken = (req, res) => {
    const gateway = new braintree.BraintreeGateway({
        environment: braintree.Environment.Sandbox,
        merchantId: process.env.BRAINTREE_MERCENT_ID,
        publicKey: process.env.BRAINTREE_PUBLIC_KEY,
        privateKey: process.env.BRAINTREE_PRIVATE_KEY
    });

    gateway.clientToken.generate({}, (error, resposne) => {
        if (error) {
            res.status(500).send({
                message: error
            })
        }else {
            res.send(resposne.clientToken)
        }
    })
}


const processPaymentCheckout = async (req, res, next) => {
    const nonceFromTheClient = req.body.paymentMethodNonce;
    const amountFromTheClient = req.body.amount;
    const gateway = new braintree.BraintreeGateway({
        environment: braintree.Environment.Sandbox,
        merchantId: process.env.BRAINTREE_MERCENT_ID,
        publicKey: process.env.BRAINTREE_PUBLIC_KEY,
        privateKey: process.env.BRAINTREE_PRIVATE_KEY
    });

    try {
        const newTransaction = await gateway.transaction.sale({
            amount: amountFromTheClient,
            paymentMethodNonce: nonceFromTheClient,
            options: {
                submitForSettlement: true
            }
        });
        return res.send(newTransaction)
    } catch (error) {
        next(error)
    }
}



module.exports = {
    generateToken,
    processPaymentCheckout 
}
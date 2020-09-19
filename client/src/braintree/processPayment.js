import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { emptyCart } from '../helpers/CartHelper';
import React from 'react'

export const processPayment = async (userId, token, paymentData) => {
    try {
        const res = await Axios.post(`/api/v1/braintree/payment/${userId}`, JSON.stringify(paymentData), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        
        return res;
    } catch (error) {
        console.log(error)
    }
}
import React from 'react'
import { Link } from 'react-router-dom'

function PaymentSuccess() {
    return (
        <div>
            <h1 className="text-sucesss">Thanks. Your payment was successfull</h1>
            <Link to='/'>Continue shopping</Link>
        </div>
    )
}

export default PaymentSuccess

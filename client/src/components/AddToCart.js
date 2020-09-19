import React, { useState } from 'react';
import Button from '../components/Button'
import Input from './Input';
import Axios from 'axios';

const AddToCart = ({prodInfo}) => {
    console.log(prodInfo)
    const [added, setAdded] = useState(false)
    const [cart, setCart] = useState([])
    const [count, setCount] = useState(0)

    const handleAddToCart = () => {
        setCount(prev => prev + 1)
    }
    const handleRemoveFromCart = () => {
        if (count > 0)
            setCount(prev => prev - 1)
    }


    return (
        <React.Fragment>
            <div className="btn-group text-center" role="group" aria-label="Basic example">
            <button type="button" onClick={handleRemoveFromCart} className="btn btn-info">-</button>
            <button type="button" onClick={handleAddToCart} className="btn btn-primary">{count > 0 ? count : null} Add to cart</button>
            <button type="button" onClick={handleAddToCart} className="btn btn-info">+</button>
            </div>
        </React.Fragment>
    )
}

export default AddToCart;
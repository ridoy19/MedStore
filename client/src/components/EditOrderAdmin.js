import React from 'react'
import Input from './Input'
import Select from './Select'

function Modal() {
    return (
        <div className="card mt-5 mx-5">
            <div className="card-body">
            <h1>Edit User Order</h1>

            <label htmlFor="order-id">Order Id</label>
            <Input 
                type="text" 
                id="order-id"
                className="form-control mb-2" 
                style={{height: 44}} 
                name="order-id"
                disabled
                value="131131"  />
            <label htmlFor="shipping-address">Shipping Address</label>

            <textarea 
                type="text" 
                cols="16"
                id="shipping-address"
                rows="5"
                className="form-control mt-2" 
                name="shipping-address" 
                value="Mirpur, Dhaka" />
            <label htmlFor="shipping-address">Status</label>

            <Select className="form-control mt-2" id="shipping-address"  style={{height: 44}} >
                <option>Not processed</option>
                <option>Processing</option>
                <option>Delivered</option>
                <option>Cancelled</option>
            </Select>
            <label htmlFor="item-name">Ordered Items</label>
            <Input 
                type="text" 
                id="order-id"
                className="form-control mb-2" 
                style={{height: 44}} 
                name="order-id"
                disabled
                value="Napa"  />
            <label htmlFor="item-name">Ordered Quantity</label>
            <Input 
                type="text" 
                id="order-id"
                className="form-control mb-2" 
                style={{height: 44}} 
                name="order-id"
                disabled
                value="131131"  />
            </div>
        </div>
    )
}

export default Modal

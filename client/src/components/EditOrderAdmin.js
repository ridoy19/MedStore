import React, { useState, useContext, useEffect } from 'react'
import Button from './Button'
import Input from './Input'
import Select from './Select'
import { AuthContext } from '../App';
import { listOrders, singleOrder, updateOrder } from '../api/OrderAPI';

function EditOrderAdmin(props) {
    const authContext = useContext(AuthContext);
    let orderId = props.match.params.orderId
    // console.log(orderId)
    const [order, setOrder] = useState([]);
    const [updateChange, setUpdateChange] = useState({
        shipping_address: '',
        status: ''
    })

    const getOrder = async () => {
        const res = await singleOrder(authContext.userState.token, orderId);
        console.log(res);
        setOrder(res.data.data);
    }

    // const handleChange = (e) => {
    //     const { value, name} = e.target;
    //     setUpdateChange(prevValue => {
    //         return({
    //             ...prevValue,
    //             [name]: value
    //         })
    //     });
    // }

    
    const orderUpdate = async () => {
        const res = await updateOrder(authContext.userState.token, orderId, order.user, updateChange)
        console.log(res);
    }

    const handleUpdate = () => {
        orderUpdate();
    }

    useEffect(() => {
        getOrder();
    },[])
    // console.log(order)

    return (
        <div className="card mt-5 mx-5">
            <div className="card-body">
            <h1>Editing User Order</h1>

            <label htmlFor="order-id">Order Id</label>
            <Input 
                type="text" 
                id="order-id"
                className="form-control mb-2" 
                style={{height: 44}} 
                name="order-id"
                readOnly
                value={order._id || ''}  />
            <label htmlFor="shipping-address">Shipping Address</label>

            <textarea 
                type="text" 
                cols="16"
                id="shipping-address"
                rows="5"
                className="form-control mt-2" 
                name="shipping-address" 
                value={order.shipping_address || ''} />
            <label htmlFor="shipping-address">Status</label>

            <Select 
                className="form-control mt-2" 
                id="shipping-address"
                style={{height: 44}} >
                <option value="Not processed">Not processed</option>
                <option value="Processing">Processing</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
            </Select>
            <label htmlFor="item-name">Ordered Items</label>
            <Input 
                type="text" 
                id="order-items"
                className="form-control mb-2" 
                style={{height: 44}} 
                name="order-items"
                readOnly
                value="Napa"  />
            <label htmlFor="item-name">Ordered Quantity</label>
            <Input 
                type="text" 
                id="order-quantity"
                className="form-control mb-2" 
                style={{height: 44}} 
                name="order-quantity"
                readOnly
                value="131131"  />
            <Button 
                onClick={handleUpdate}
                type="submit" 
                className="btn btn-warning text-white mr-3">Save Changes</Button>
            <Button 
                type="submit" 
                className="btn btn-danger text-white">Cancel</Button>
            </div>
        </div>
    )
}

export default EditOrderAdmin

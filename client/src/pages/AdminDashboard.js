import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../App';
import { Link, Redirect, useHistory } from 'react-router-dom'
import Button from '../components/Button';
import { listOrders } from '../api/OrderAPI';
import Card from '../components/Card';
import moment from 'moment'
import EditOrderAdmin from '../components/EditOrderAdmin';
import { deleteOrder } from '../api/OrderAPI'

function AdminDashBoard() {
    const authContext = useContext(AuthContext);

    //console.log(authContext)
    const [allOrders, setAllOrders] = useState([]);
    const getAllOrders = async () => {
        const res = await listOrders(authContext.userState.token);
        console.log(res);
        setAllOrders(res.data.data);
    }

    const removeOrder = async (token, orderId) => {
        const res = await deleteOrder(token, orderId);
        console.log(res);
        const res1 = await listOrders(authContext.userState.token);
        setAllOrders(res1.data.data)
        console.log(res1);
    }

    // const removeOrder = async (token, orderId) => {
    //     try {
    //         const res = await deleteOrder(token, orderId)
    //         console.log(res);
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // const handleDeleteIconClick = (e) => {
    //     removeOrder(authContext.userState.token, )
    // }

    // https://codereview.stackexchange.com/questions/212250/generating-a-table-based-on-an-array-of-objects
    // TO-DO: Generate Table
    const genTable = allOrders && allOrders.length > 0 && allOrders.map((order, oIndex) => {
        return (
            <tr key={oIndex}>
                <td>{order._id}</td>
                <td>{moment(order.createdAt).format('lll')}</td>
                {/* {
                    order.products.map((prod, pIndex) => {
                        return (
                            <tr key={pIndex}>
                                <td>{prod.brandName}</td>
                                <td >{prod.count}</td>
                            </tr>                            
                        )
                    })
                } */}
                <td>&#2547; {order.subtotal}</td>
                <td>{order.shipping_address}</td>
                <td><span className="badge badge-warning">{order.status}</span></td>
                <td><Link className="fa fa-edit" to={`/admin/edit-orders/${order._id}`} style={{color: '#009999'}}></Link></td>
                <td onClick={() => removeOrder(authContext.userState.token, order._id)}><i className="fa fa-trash" style={{color: 'red'}}></i></td>
            </tr>
        )
    })

    console.log(allOrders);

    useEffect(() => {
        getAllOrders();
    },[])

    return (
        <>
        <div style={{marginTop: 50}} className="jumbotron">
            <div className="row">
                <h1 className="text-success">{authContext.userState.user.name}</h1>
            </div>
            <div className="row">
                <h4>{authContext.userState.user.email}</h4>
            </div>
            <div className="row">
                <h5 className="text-muted">{authContext.userState.user.isAdmin ? "Admin" : "User"}</h5>
            </div>
            <div className="row mt-5 btn-group" role="group">
                <Link to="/add/category" className="btn btn-dark" style={{textDecoration: 'none'}}><i className="fa fa-plus" /> Add Category</Link>
                <Link to="/add/product" className="btn btn-success" style={{textDecoration: 'none'}}><i className="fa fa-plus" /> Add Product</Link>
                {/* <Link to="/all-orders" className="btn btn-info" style={{textDecoration: 'none'}}><i className="fa fa-list" /> All Orders</Link> */}
            </div>
            {/* <div className="row mt-5">
                <Link to="/add/product" className="btn btn-success" style={{textDecoration: 'none'}}><i className="fa fa-plus" /> Add Product</Link>
            </div>
            <div className="row mt-5">
                <Link to="/all-orders" className="btn btn-info" style={{textDecoration: 'none'}}><i className="fa fa-list" /> All Orders</Link>
            </div> */}
        </div>
        <div className="row mt-5">
            <h1>All Orders</h1>
            <table className="table table-bordered table-dark table-hover">
                <tbody>
                    {genTable}
                </tbody>
            </table>
            </div>
        </>
    )
}

export default AdminDashBoard
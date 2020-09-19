import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../App';


function UserDashBoard() {
    const authContext = useContext(AuthContext);
    console.log(authContext)
    return (
        <div style={{marginTop: 250}} className="jumbotron">
            <div className="row">
                <h1 className="text-success">{authContext.userState.user.name}</h1>
            </div>
            <div className="row">
                <h4>{authContext.userState.user.email}</h4>
            </div>
            <div className="row">
                <h5 className="text-muted">{authContext.userState.user.isAdmin ? "Admin" : "User"}</h5>
            </div>
            
             <div className="row mt-5">
                <Link to="/my-cart" style={{textDecoration: 'none'}}>My Cart</Link>
            </div>
                
            <div className="row mt-5">
            <table className="table table-hover border">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Order Id</th>
                    <th scope="col">Order Date</th>
                    <th scope="col">Item</th>
                    <th scope="col">Quantity</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>5ba138884hdeada28884aa</td>
                    <td>April 20, 2020</td>
                    <td>Napa Extra</td>
                    <td>2</td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td>5ba138884eeradda84aa</td>
                    <td>May 20, 2020</td>
                    <td>Paracetamol 500mg</td>
                    <td>30</td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default UserDashBoard

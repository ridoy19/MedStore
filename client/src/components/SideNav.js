import React, { useState, useContext } from 'react';
import Home from '../pages/Home';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    NavLink
} from 'react-router-dom';
import NavBar from '../components/NavBar'
import Companies from '../pages/Companies'
import NotFound from '../pages/NotFound'
import Cart from '../pages/Cart'

import { CartProvider, CartContext } from '../context/CartContext';
import Checkout from '../pages/Checkout';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import { AuthContext } from '../App'
import Axios from 'axios';
import GuardedRouting from './routing/GuardedRouting';
import AdminRouting from './routing/AdminRouting'
import UserDashboard from '../pages/UserDashBoard';
import AdminDashBoard from '../pages/AdminDashboard';
import { totalItem } from '../helpers/CartHelper';
import PaymentSucess from '../pages/PaymentSuccess';
import EmptyCart from './EmptyCart';
import EditOrderAdmin from '../components/EditOrderAdmin'

const SideNav = () => {
    const authContext = useContext(AuthContext)

    const handleSignOut = async () => {
        localStorage.clear();
        authContext.userDispatch({type: 'USER_LOGOUT'});
        const res = await Axios.get('/api/v1/auth/signout');
        console.log(res);
    }

    return (
        <CartProvider>
        <React.Fragment>
            <Router>
                {/* <NavBar /> */}
                <div className="row">
                    <div className="col-2">
                        <div id='mySidenav' className='sidenav'>
                            <NavLink
                                exact
                                className="nav-link" 
                                to='/'
                                activeStyle={{color: '#fafeac'}}  
                                >Home</NavLink>
                            <NavLink
                                className="nav-link" 
                                to='/carts' 
                                activeStyle={{color: '#fafeac'}} 
                                >Cart 
                                </NavLink>
                            <NavLink
                                exact
                                className="nav-link" 
                                to='/companies'
                                activeStyle={{color: '#fafeac'}}  
                                >Companies</NavLink>
                            
                           
                            {
                                authContext.userState.isAuthenticated ? <><NavLink
                                className="nav-link" 
                                to='/checkout' 
                                >Payment</NavLink>
                                
                                 {
                                      authContext.userState.isAuthenticated && authContext.userState.user.isAdmin === 0 ? <NavLink
                                      className="nav-link" 
                                      to='/user/dashboard'
                                      activeStyle={{color: '#fafeac'}} 
                                      >User Dashboard</NavLink> : 
                                      <NavLink
                                        className="nav-link" 
                                        to='/admin/dashboard' 
                                        activeStyle={{color: '#fafeac'}} 
                                        >Admin Dashboard</NavLink>
                                 }
                                <NavLink
                                className="nav-link" 
                                to='/' 
                                activeStyle={{color: '#fafeac'}} 
                                onClick={handleSignOut}
                                >Signout</NavLink>
                                </> : <>
                                {/* <NavLink 
                                to={window.location} 
                                className='closebtn' 
                                onClick={handleOpenClick}>&times;</NavLink> */}
                            
                            {/* <NavLink
                                className="nav-link" 
                                to='/category' 
                                activeStyle={{color: '#fafeac'}} 
                                >Category</NavLink> */}
                                <NavLink
                                className="nav-link" 
                                activeStyle={{color: '#fafeac'}} 
                                to='/signin' 
                                >SignIn</NavLink>
                            <NavLink
                                className="nav-link" 
                                to='/signup' 
                                activeStyle={{color: '#fafeac'}} 
                                >SignUp</NavLink>
                                </>
                            }
                            
                        </div>
                    </div>
                    <div className="col-10">
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/companies" component={Companies} />
                            <Route path="/carts" component={Cart} />
                            <Route path="/checkout" component={Checkout} />
                            <Route path="/signin" component={Signin} />
                            <Route path="/signup" component={Signup} />
                            <Route path="/empty-cart" component={EmptyCart} />
                            <Route path="/payment-success" component={PaymentSucess} />
                            <Route path="/admin/edit-orders/:orderId" component={EditOrderAdmin} />

                            <GuardedRouting path='/user/dashboard' exact component={UserDashboard} />
                            <AdminRouting path='/admin/dashboard' exact component={AdminDashBoard} />

                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </div>
                </Router>
        </React.Fragment>
        </CartProvider>
    )
}

export default SideNav;
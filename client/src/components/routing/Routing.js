import React from 'react';
import { Switch, Route, Link, BrowserRouter as Router,
} from 'react-router-dom';
import Home from '../../pages/Home';
import NotFound from '../../pages/NotFound';
import NavBar from '../NavBar';
import Companies from '../../pages/Companies';
import SideNav from '../SideNav';
import Cart from '../../pages/Cart'
import Checkout from '../../pages/Checkout';

const Routing = () => {
    return (
        <Router>
                <SideNav />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/companies" component={Companies} />
                    <Route path="/carts" component={Cart} />
                    <Route path="/checkout" component={Checkout} />
                    <Route component={NotFound} />
                </Switch>
        </Router>

    )
}

export default Routing;
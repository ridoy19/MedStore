import React from 'react';
import { Link } from 'react-router-dom';
import Home from '../pages/Home';
import Input from '../components/Input';
import Button from '../components/Button';

const NavBar = () => {

    return (
        <React.Fragment>
            <nav className="navbar navbar-dark bg-dark fixed-top" >
                <Link to="/" className="navbar-brand">
                <img src="logo.png" width="80" height="80" className="d-inline-block align-center" alt="" />
                    MediStore
                </Link>
                <form className="form-inline ml-auto mr-auto">
                    <Input 
                        className="form-control mr-sm-2" 
                        type="search" 
                        style={{width: '35rem', height: '4rem', fontSize: '1rem'}}
                        placeholder="Search by brand or generic or origin-name" 
                        aria-label="Search" />
                    <Button 
                        className="btn btn-success my-2 my-sm-0" 
                        style={{height: '4rem', width: '7rem'}} 
                        type="submit">Search</Button>
                </form>
            </nav>
        </React.Fragment>
    )
}

export default NavBar;
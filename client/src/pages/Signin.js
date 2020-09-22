import React, { useState, useContext, } from 'react'
import Axios from 'axios'
import { Link, Redirect, useHistory } from 'react-router-dom';
import { AuthContext } from '../App'

function Signin() {
    const authContext = useContext(AuthContext);
    const history = useHistory();
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { value, name } = e.target;
        setUserInfo(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }  
        });
    }

    const checkUser = () => {
        if (authContext.userState.isAuthenticated && authContext.userState.user.isAdmin === 1) {
            return history.push('/admin/dashboard')
        }else {
            return history.push('/carts')
        }
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const res = await Axios.post('/api/v1/auth/signin', JSON.stringify(userInfo), {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("user",JSON.stringify(res.data.user))
            authContext.userDispatch({ type: "USER_LOGIN", payload: res.data})

            console.log(res)
            //history.push('/');
            checkUser();

            
        } catch (error) {         
            console.log(error) 
        }
        
    }

    return (
        <div className="container register">
                <div className="row">
                    <div className="col-md-9 register-right">
                        
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 className="register-heading">Login</h3>
                                <div className="row register-form">
                                    <div className="col-md">
                                        <div className="form-group">
                                            <input type="email" name="email" className="form-control" placeholder="Your Email *" onChange={handleChange} value={userInfo.email} />
                                        </div>
                                        
                                        <div className="form-group">
                                            <input type="password" name="password" className="form-control" placeholder="Password *" onChange={handleChange} value={userInfo.password} />
                                        </div>
                                        <button type="submit" onClick={handleClick}  className="btnRegister">Login</button>
                                        
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <p className="ml-5">New to MediStore? <Link to='/signup'>Create an account</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
    )
}

export default Signin

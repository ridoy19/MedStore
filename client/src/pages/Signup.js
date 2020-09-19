import React, { useState } from 'react'
import Axios from 'axios'
import { Link, useHistory } from 'react-router-dom';

function Signup() {
    const history = useHistory();
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        phone: ""
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


    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const res = await Axios.post('/api/v1/auth/signup', JSON.stringify(userInfo), {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            history.push('/');
            // console.log(res)
        } catch (error) {         
            console.log(error) 
        }
        
    }

    return (
        <div className="container register">
                <div className="row">
                    {/* <div class="col-md-3 register-left">
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/>
                        <h3>Welcome</h3>
                        <input type="submit" name="" value="Login"/><br/>
                    </div> */}
                    <div className="col-md-9 register-right">
                        
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 className="register-heading">Sign Up</h3>
                                <div className="row register-form">
                                    <div className="col-md-8">
                                        <div className="form-group">
                                            <input type="text" name="name" className="form-control" placeholder="Name *" onChange={handleChange} value={userInfo.name} />
                                        </div>
                                        <div className="form-group">
                                            <textarea type="text" name="address" className="form-control" placeholder="Address *" onChange={handleChange} value={userInfo.address} />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" name="password" className="form-control" placeholder="Password *" onChange={handleChange} value={userInfo.password} />
                                        </div>
                                        {/* <div class="form-group">
                                            <input type="password" name="" class="form-control"  placeholder="Confirm Password *" value="" />
                                        </div> */}
                                        
                                    </div>
                                    <div className="col-md-8">
                                        <div className="form-group">
                                            <input type="email" name="email" className="form-control" placeholder="Your Email *" onChange={handleChange} value={userInfo.email} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="phone" name="phone" className="form-control" placeholder="Your Phone *" onChange={handleChange} value={userInfo.phone} />
                                        </div>
                                        
                                        <button type="submit" onClick={handleClick}  className="btnRegister">Register</button>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col">
                                        <p className="ml-5">Already have an account? <Link to='/signin'>Sign In</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
    )
}

export default Signup

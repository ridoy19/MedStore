import React, { useState, useEffect, useContext } from 'react'
import { CartContext } from '../context/CartContext';
import Axios from 'axios';
import Button from '../components/Button'
import { dosageImage } from '../helpers/dosageImage';
import { Link, Redirect } from 'react-router-dom';
import Checkout from './Checkout';
import { emptyCart, getCart, getCartItemSpecificInfo } from '../helpers/CartHelper';
import EmptyCart from '../components/EmptyCart';
import { AuthContext } from '../App';
import DropIn from 'braintree-web-drop-in-react';
import { processPayment } from '../braintree/processPayment';
import PaymentSuccess from './PaymentSuccess';
import { placeOrder } from '../api/CartAPI';

const Cart = () => {
	const authContext = useContext(AuthContext);
	const [cartItem, setCartItem] = useState([]);
	const [count, setCount] = useState(1)
	// console.log(authContext)
	const getTotal = cartItem.reduce( ( sum, { total } ) => sum + total , 0)
	// console.log(result)

	const [clientToken, setClientToken] = useState({
		success: false,
		clientToken: null,
		error: '',
		shipping_address: '',
		instance: {},
		userInfo: {}
	});
	//console.log(userId, token)
	
	// const processPayment = async (userId, token, paymentData) => {
	// 	try {
	// 		const res = await Axios.post(`/api/v1/braintree/payment/${userId}`, JSON.stringify(paymentData), {
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 				'Authorization': `Bearer ${token}`
	// 			}
	// 		})
	
	// 		console.log(res);
	// 	} catch (error) {
	// 		console.log(error)
	// 	}
	// }

	const handleAdress = (e) => {
		setClientToken({...clientToken, shipping_address: e.target.value})
	}
	console.log(clientToken)

	const getBrainTreeClientToken = async (signal) => {
		let userId;
		let token;

		if (typeof window !== 'undefined') {
			if (localStorage.getItem('user') && localStorage.getItem('token')) {
				userId = (JSON.parse(localStorage.getItem('user'))._id)
				token = localStorage.getItem('token');
			}
		}
		try {
			const res = await Axios.get(`/api/v1/braintree/get-token/${userId}`, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});
			//console.log(res.data)
			setClientToken({
				...clientToken,
				clientToken: res.data
			});
		} catch (error) {
			setClientToken({
				...clientToken,
				error: error
			});
			console.log(error)
		}
	}
  
	// 	const [paymentType, setPaymentType] = useState('Cash on delivery');
	// 	const handlePaymentMethodChange = (e) => {
	// 		setPaymentType(e.target.value)
	// 	}

	const buy = async () => {
		try {
			let userId;
			let token;

			if (typeof window !== 'undefined') {
				if (localStorage.getItem('user') && localStorage.getItem('token')) {
					userId = (JSON.parse(localStorage.getItem('user'))._id)
					token = localStorage.getItem('token');
				}
			}
			// send nonce to your server
			// nonce = clientToken.instance.requestPaymentMethod()
			const { nonce } = await clientToken.instance.requestPaymentMethod();
			// once you have nonce (e.g card type, card number) send nonce as 'paymentMethodNonce'
			// to backend as well as the total to be charged
			//console.log(`Send nonce and total for payment process ${nonce} \t ${getTotal}`);
			const paymentData = {
				paymentMethodNonce: nonce,
				amount: getTotal
			}
			
			// after this we have to make the cart empty and also display the payment success
			const res = await processPayment(userId, token, paymentData)
			console.log(res)
			// Create Cart Data
			const orderData = {
				products: JSON.parse(localStorage.getItem('cart')),
				transaction_id: res.data.transaction.id,
				subtotal: res.data.transaction.amount,
				shipping_address: clientToken.shipping_address
			}

			//console.log(orderData)
			placeOrder(userId, token, orderData).then(response => {
				// Empty Cart Item
				emptyCart(() => {
					console.log(`cart emptied`)
					setCartItem([]);
				});
				setClientToken({success: true});

			});
			//console.log(orderRes)
			
		} catch (error) {
			console.log(error)
			setClientToken({...clientToken, error: error})
		}
	}

	
	const showDropIn = () => {
		return (
			<div>
				{
					clientToken.clientToken !== null && cartItem.length > 0 ? 
					<div>
						<textarea 
							rows="3" 
							onChange={handleAdress}
							name="address"
							value={clientToken.shipping_address}
							className="form-control" 
							placeholder='Enter shipping address...'>

						</textarea>
						<DropIn 
							options={{
								authorization: clientToken.clientToken,
							}} 
							onInstance={
								instance => clientToken.instance = instance
							}
						/>
						<button 
							onClick={buy} 
							className="btn btn-out btn-primary btn-square btn-main"
						>
							Pay Now
						</button>
					</div> : null
				}
			</div>
		)
	}
	  //console.log(clientToken)
	const [clicked, setClicked] = useState(false)
	  const handleCLick = () => {
		setClicked(true);
	  }
	
	

	const updateItem = (productId, count, price) => {
		let cart = [];
		if (typeof window !== 'undefined') {
			if (localStorage.getItem('cart')) {
				cart = JSON.parse(localStorage.getItem('cart'));
			}
			cart.map((product, i) => {
				if (product._id === productId) {
					cart[i].count = count;
					cart[i].total = count * price;
				}
	
			});
			setCartItem(cart);
			localStorage.setItem('cart', JSON.stringify(cart));
		}
	};

	const removeItem = productId => {
		let cart = [];
		if (typeof window !== 'undefined') {
			if (localStorage.getItem('cart')) {
				cart = JSON.parse(localStorage.getItem('cart'));
			}
	
			cart.map((product, i) => {
				if (product._id === productId) {
					cart.splice(i, 1);
				}
			});
	
			localStorage.setItem('cart', JSON.stringify(cart));
		}
		setCartItem(cart)
		return cart;
	};
	
	const handleChange = (prodId, price) => e =>{
		setCount(e.target.value < 1 ? 1 : e.target.value);
		if (e.target.value > 1) {
			updateItem(prodId, e.target.value, price);
		}
	}
	
	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;
		setCartItem(getCart(signal));
		getBrainTreeClientToken(signal);
		return function cleanup() {
			abortController.abort();
		}
	}, [])

	return (
		<React.Fragment>
			<div className="container-fluid">
				<h1>Your Cart</h1><hr/>
	    <div className="row">
	        <aside className="col-lg-9">
	            <div className="card">
	                <div className="table-responsive">
	                    <table className="table table-borderless table-shopping-cart">
	                        <thead className="text-muted">
	                            <tr className="small text-uppercase">
	                                <th scope="col">Product</th>
	                                <th scope="col" width="120">Quantity</th>
	                                <th scope="col" width="120">Price</th>
	                                <th scope="col" className="text-right d-none d-md-block" width="200">Action</th>
	                            </tr>
	                        </thead>
	                        <tbody>
								{
									cartItem.length > 0 ? 
										cartItem.map((items, index) => {
										return (<tr key={index}>
											<td>
												<figure className="itemside align-items-center">
													<div className="aside">
														{
															dosageImage(items.dosageType)
														}
														{/* <img src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1574342017/rTVSl.jpg" class="img-sm" /> */}
														</div> 
													<figcaption className="info"> 
													{/* <a 
														href="#" 
														className="title text-dark" 
														data-abc="true">Tshirt with round nect</a> */}
														<p className="text-info large">{items.brandName}<br/></p>
														<p className="text-black small">{items.dosageType}<br/></p>
														<p className="text-muted small">{items.manufacturer}<br/></p>

													</figcaption>
												</figure>
											</td>
											<td> 	
												<input 
													className="form-control" 
													type="number" 
													value={items.count} 
													onChange={handleChange(items._id, items.price)}  
													name="count" />
											</td>
											<td>
												<div className="price-wrap"> 
													<var className="price">&#2547; {(items.total).toFixed(2)}</var> 
													<small className="text-muted">&#2547; {items.price} each </small> 
												</div>
											</td>
											<td className="text-right d-none d-md-block"> 
											<button type="button" 
												onClick={() => removeItem(items._id)}
												className="btn btn-light" 
											>Remove</button> </td>
										</tr>
										)
									}): <tr>
											<td><EmptyCart /></td>
										</tr>

								}
	                            
	                        </tbody>
	                    </table>
	                </div>
	            </div>
	        </aside>
	        <aside className="col-lg-3">
	            <div className="card mb-3">
	                <div className="card-body">
	                    <form>
	                        <div className="form-group"> <label>Have coupon?</label>
	                            <div className="input-group"> 
									<input 
										type="text" 
										className="form-control coupon" 
										name="coupon" 
										placeholder="Coupon code" /> 
									<span className="input-group-append"> 
									<button 
										className="btn btn-primary btn-apply coupon"
									>Apply</button> 
									</span> 
								</div>
	                        </div>
	                    </form>
	                </div>
	            </div>
	            <div className="card">
	                <div className="card-body">
	                    <dl className="dlist-align">
	                        <dt>Total price:</dt>
	                        <dd className="text-right ml-3">&#2547; {(getTotal).toFixed(2)}</dd>
	                    </dl>
	                    <dl className="dlist-align">
	                        <dt>Shipping charge:</dt>
	                        <dd className="text-right text-danger ml-3">&#2547; 0.00</dd>
	                    </dl>
	                    <dl className="dlist-align"  style={{fontSize: 30}}>
	                        <dt>Total:</dt>
	                        <dd className="text-right text-dark b ml-3" >
								<strong>&#2547; {(getTotal).toFixed(2)}</strong>
							</dd>
	                    </dl>
	                    <hr/> 
						
						{!authContext.userState.isAuthenticated && cartItem.length > 0 ? 
						<Link 
							className="btn btn-out btn-primary btn-square btn-main" 
							to="/signin"
						>Sign In To Checkout</Link> : 
						/* <Link 
							onClick={handleCLick} 
							className="btn btn-out btn-primary btn-square btn-main" 
							to="/checkout">Checkout</Link>*/ showDropIn() }
						{/* <Link to="/checkout" 
							className="btn btn-out btn-primary btn-square btn-main" 
							>cHECKOUT</Link> */}
						<Link to="/" 
							className="btn btn-out btn-success btn-square btn-main mt-2" 
							>Continue Shopping</Link>
	                </div>
	            </div>
	        </aside>

	    </div>
		{/* <Checkout  dataToken={clientToken} dataItem={cartItem} /> */}

	</div>
		</React.Fragment>
	)
}

export default Cart

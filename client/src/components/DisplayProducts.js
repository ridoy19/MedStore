import React, { useContext, useState, useEffect } from 'react';
import { dosageImage } from '../helpers/dosageImage';
import Loading from './Loading';
import { CartContext, useStateValue } from '../context/CartContext';
import Axios from 'axios';
import Cart from '../pages/Cart';
import MiniCart from './MiniCart';
import Input from './Input';
import { Redirect, useHistory } from 'react-router-dom';
import { addItem } from '../helpers/CartHelper';

const DisplayProducts = ({products, loading}) => { 
    //const [count, setCount] = useState(1);
    const [cartItem, setCartItem] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    //console.log(products)
    // Context
    const cartContext = useContext(CartContext);
    //console.log(cartContext.cartDispatch)
    // const increaseCount = () => {
    //     if (isClicked) {
    //         setCount(count + 1)
    //     }
    //     return count;
    // }
    const [count, setCount] = useState(1)

    const history = useHistory();

    const handleChange = (event) => {
        setCount(event.target.value);
    }
    //console.log(count)
    
    
    const addToCart = async (id, price, total) => {
        //console.log(id)

        setIsClicked(true)
        setCartItem(prevValue => {
            return ({
                ...prevValue,
                productId: id,
                quantity: count,
                // price: price,
                // total: total
            })
        })
            
        try {
            const res = await Axios.post(`/api/carts/${id}/add-to-cart`, cartItem, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setCartItem(res.data)
            console.log(res);
        } catch (error) {
            console.log(error.response)
        }
       // history.push('/carts');
    }
        
        
    //console.log(cartItem)
    

    // add item to cart
    // const addItemToCart = async (productId, quantity, price, total) => {
    //     setCount(prev => prev + 1);

    //     cartContext.cartDispatch({
    //         type: 'ADD_ITEM_TO_CART',
    //         items: [
    //             {
    //                 //productId: productId,
    //                 quantity: quantity,
    //                 // price: price,
    //                 // total: total
    //             }
    //         ],
    //     })
    // }

    const [isRedirect, setRedirect] = useState(false);
    
    const addItemToCart = async () => {
        addItem(products, () => {
            setRedirect(true);
        })
    }


    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/carts" />
        }
    }
    return (
        <React.Fragment>
            <div className="wrapper">
                <div className="container">
                <div className="row g-1 pt-3">
                {shouldRedirect(isRedirect)}
                {
                    loading ? <Loading /> : products.map((product, index) => {
                        return (
                            <div className="col-md-4 pb-3" key={index}>
                                <div className="card p-3">
                                    <div className="text-center"> 
                                        {
                                            dosageImage(product.dosageType)
                                        }
                                    </div>
                                    <div className="product-details"> 
                                        <span className="font-weight-bold d-block">{product.brandName}</span> 
                                        <span>{product.genericName}</span>
                                        <span className="font-weight-bold d-block">{product.strength}</span> 
                                        <span>{product.manufacturer}</span>
                                        <span>{product.dosageType}</span>

                                        <span 
                                            className="font-weight-bold d-block text-info pt-3" 
                                            style={{fontSize: 18}}>Unit Price : &#2547; {product.price}
                                        </span> 
                                        
                                        <div className="buttons d-flex flex-row">
                                            {/* <div className="cart">
                                                <span className={isClicked ? "dot" : null}>{count > 0 ? count : null}</span> 
                                                <i className="fa fa-shopping-cart"></i>
                                            </div>  */}
                                            {/* <Input 
                                                style={{width: 50}}
                                                type="number" 
                                                name="quantity"
                                                value={count} 
                                                onChange={handleChange} ></Input> */}
                                            <button 
                                                id={product._id}
                                                className="btn btn-success cart-button btn-block" 
                                                onClick={() => addItem(product, () => {
                                                    setRedirect(true);
                                                })}>
                                                    Add to cart
                                            </button>
                                        </div>

                                        {/* <div className="weight"> </div> */}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    
                }
                </div>
                    <MiniCart cart={cartItem} />

                </div>
            </div>
        </React.Fragment>
    )
}



export default DisplayProducts;
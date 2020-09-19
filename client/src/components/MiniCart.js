import React from 'react';
import { totalItem } from '../helpers/CartHelper';

const MiniCart = ({ cart }) => {
    console.log(cart)
    const getTotal = cart.reduce( ( sum, { total } ) => sum + total , 0)

    return (
        <React.Fragment>
             {/* Mini_-Cart */}
        
             <div id="showRight" className="mini-cart-position">
                <div className="miniCart-item-group cartinfo cart_anchor" >
                    <div className="miniCart-item-number-group">
                        <span className="miniCart-items badge">{totalItem()}</span>
                        <span className="miniCart-item-text">
                            Items
                        </span>
                    </div>                            
                    <div 
                        id="cart_amount" 
                        className="miniCart-float-price cart_total_taka no_odometer">
                            {getTotal}
                    </div>
                    <span className="gb-gradient miniCart-button">
                        View Cart
                    </span>
                    <span id="miniCart-close" className="miniCart-close gb-gradient">
                        <i className="la la-close"></i>
                    </span>
                </div>
            </div>
            {/* Mini Cart End */}
        </React.Fragment>
    )
}

export default MiniCart;
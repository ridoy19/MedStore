import React, { useState, useReducer, useContext } from 'react';
import { reducer, initialState } from '../Reducers/CartReducers';

export const CartContext = React.createContext();

export const CartProvider = (props) => {
    const [cart, dispatch] = useReducer(reducer, initialState)
    return (
        <CartContext.Provider value={{cartState: cart, cartDispatch: dispatch}}>
            {props.children}
        </CartContext.Provider>
    )
}

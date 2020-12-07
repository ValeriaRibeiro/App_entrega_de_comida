import React, {createContext, useReducer} from 'react';
import {initialState, CartReducer} from '../../data/reducers/CartReducer';

export const CartContext =  createContext(initialState);

export default function CartProvider(props){
    const [cartState, cartDispatch] = useReducer(CartReducer, initialState);

    return(
        <CartContext.Provider value={[cartState, cartDispatch]}>
            {props.children}
        </CartContext.Provider>
    )
}


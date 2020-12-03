import {CART_ADD_PRODUCT, CART_REMOVE_PRODUCT, CART_CLEAR} from '../actions/CartActions';

export const initialState = {
    products: []
}

export const CartReducer = (store = initialState, action) => {
    switch(action.type){
        case CART_ADD_PRODUCT:
            return {...store, products: [...store.products, action.value]};
        case CART_REMOVE_PRODUCT:
            return {...store, 
                products: store.products.filter(item => item !== action.value)
            };
        case CART_CLEAR:
            return {...store, products: []};
        default: return store;
    }
}
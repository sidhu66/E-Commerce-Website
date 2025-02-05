import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Correct the import here
import { composeWithDevTools } from 'redux-devtools-extension';

import { productListReducers, productDetailsReducers } from './reducers/productReducers';
import { cartReducer} from './reducers/cartReducers'
import { userLoginReducer } from './reducers/userReducers'

const reducer = combineReducers({ productList: productListReducers, 
     productDetails: productDetailsReducers, cart:cartReducer, userLogin:userLoginReducer,});

const cartItemFromStorage = localStorage.getItem('cartItems') ? 
     JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? 
     JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
     cart: {cartItems: cartItemFromStorage},
     userLogin: {userInfo: userInfoFromStorage}
};
const middleware = [thunk];
const store = createStore( reducer, initialState,
     composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

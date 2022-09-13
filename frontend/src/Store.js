import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import { productDetailsReducer, productReducer } from './reducers/ProductReducer'
import { authReducer, forgotPasswordReducer, userReducer } from './reducers/UserReducer'
import { cartReducer } from './reducers/CartReducer'

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,

    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,

    cart: cartReducer
})


let initialState = {
    cart : {
        cartItems: localStorage.getItem('cartItems') ? 
        JSON.parse(localStorage.getItem('cartItems'))
        : []
    }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
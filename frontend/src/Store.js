import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productsReducer } from './reducers/ProductReducer'
import { authReducer, forgotPasswordReducer, userReducer } from './reducers/UserReducer'
import { cartReducer } from './reducers/CartReducer'
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from './reducers/OrderReducer'

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product: productReducer,

    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,

    cart: cartReducer,
    myOrders: myOrdersReducer,
    newOrder: newOrderReducer,
    orderDetails: orderDetailsReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
})


let initialState = {
    cart : {
        cartItems: localStorage.getItem('cartItems') ? 
        JSON.parse(localStorage.getItem('cartItems'))
        : [],
        shippingInfo: localStorage.getItem('shippingInfo') ? 
        JSON.parse(localStorage.getItem('shippingInfo'))
        : {}
    }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
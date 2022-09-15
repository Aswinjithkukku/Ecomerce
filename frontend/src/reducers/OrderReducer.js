import {
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    MY_ORDER_FAIL,
    CLEAR_ERRORS,
} from '../constants/OrderConstants'

export const myOrdersReducer = ( state = { orders: [] }, action ) => {
    switch(action.type) {
        case MY_ORDER_REQUEST:
            return {
                loading: true
            }
        case MY_ORDER_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }
        case MY_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return {
                state
            }
    }
}
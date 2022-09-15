import axios from "axios";
import {
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    MY_ORDER_FAIL,
    CLEAR_ERRORS,
} from '../constants/OrderConstants'

// Get currently logged in user orders
export const myOrders = () => async (dispatch) => {
    try {
        dispatch({type: MY_ORDER_REQUEST})

        const { data } = await axios.get('/api/v1/orders/me')

        dispatch({
            type: MY_ORDER_SUCCESS,
            payload: data.orders
        })
    } catch (error) {
        dispatch({
            type: MY_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}

// clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}
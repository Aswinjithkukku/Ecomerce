import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingInfo } from '../actions/CartAction'
import Loader from '../components/Loader'
import MetaData from '../components/layout/MetaData'
import { useNavigate } from "react-router-dom";
import CheckOutSteps from "../components/CheckOutSteps";
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import axios from "axios";

const options = {
    style : {
        base: {
            fontSize : '16px'
        },
        invalid: {
            color: '#9e2146'
        }
    }
}

function PaymentScreen() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const stripe = useStripe()
    const elements = useElements()

    const { user } = useSelector(state => state.auth)
    const { cartItems, shippingInfo } = useSelector(state => state.cart)

    useEffect(() => {

    },[])

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100) 
    }
    const submitHandler = async(e) => {
        e.preventDefault()

        document.querySelector('#pay_btn').disabled = true

        let res;

        try {
            
            const config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            }
            res = await axios.post('/api/v1/payment/process', paymentData, config )
        } catch (error) {
            document.querySelector('#pay_btn').disabled = false
            window.alert(error.response.data.message)
        }
    }

  return (
    <Fragment>
        <MetaData title={'Payment'} />
        <Fragment>
        <div className="max-w-screen-sm mx-auto mb-10">
      <div className="mx-20 mt-48">
        <CheckOutSteps shipping confirmOrder payment />
        <div className="bg-gray-500 rounded-xl">
          <div className="mx-10">
            <form onSubmit={submitHandler}>
              <div className="text-3xl font-extrabold">Card Info</div>
              <div className="cardNo">
                <label htmlFor="cardNoField" className="text-lg font-bold">Card Number</label>
                <CardNumberElement
                  id="cardNoField"
                  type="text"
                  className="block p-2 md:w-full text-gray-900 bg-gray-50  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                  options={options}
                //   value={email}
                //   onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="cardExp">
                <label htmlFor="cardExpField" className="text-lg font-bold">Card Expiry </label>
                <CardExpiryElement
                  id='cardExpField'
                  type="text"
                  className="block p-2  md:w-full text-gray-900 bg-gray-50  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                  options={options}
                //   value={password}
                //   onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="cardCvc">
                <label htmlFor="cardCvcField" className="text-lg font-bold">Card CVC </label>
                <CardCvcElement
                  id='cardCvcField'
                  type="text"
                  className="block p-2  md:w-full text-gray-900 bg-gray-50  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                  options={options}
                //   value={password}
                //   onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button id="pay_btn" type='submit' value='Submit' className="text-2xl font-bold bg-slate-300 hover:bg-neutral-300 py-2 rounded-lg w-full">
                Pay
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
        </Fragment> 
    </Fragment>
  )
} 

export default PaymentScreen
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import MetaData from '../components/layout/MetaData'
import { useNavigate } from "react-router-dom";
import CheckOutSteps from "../components/CheckOutSteps";
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import axios from "axios";
import { createOrder, clearErrors } from '../actions/OrderAction'
import MobCheckOutSteps from "../components/MobCheckOutSteps";

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
    const { error } = useSelector(state => state.cart)

    useEffect(() => {
      if(error) {
        window.alert(error)
        dispatch(clearErrors())
      }
    },[dispatch,error])
    const order = {
      orderItems: cartItems,
      shippingInfo
    }

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
    if(orderInfo) {
      order.itemPrice = orderInfo.itemPrice
      order.shippingPrice = orderInfo.shippingPrice
      order.taxPrice = orderInfo.taxPrice
      order.totalPrice = orderInfo.totalPrice
    } 
    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100) 
    }
    const submitHandler = async (e) => {
        e.preventDefault()

        document.querySelector('#pay_btn').disabled = true

        let res;

        try {
            
            const config = {
                headers : {
                    'Content-Type': 'application/json',
                }
            }
            res = await axios.post('/api/v1/payment/process', paymentData, config )

            const clientSecret = res.data.client_secret

            if(!stripe || !elements) {
              return
            }

            const result = await stripe.confirmCardPayment(clientSecret, {
              payment_method: {
                card: elements.getElement(CardNumberElement),
                billing_details: {
                  name: user.name,
                  email: user.email
                }
              }
            })

            if(result.error) {
              window.alert(result.error.message)
              document.querySelector('#pay_btn').disabled = false
            } else {
              // The payment is processed or not
              if(result.paymentIntent.status === 'succeeded') {

                order.paymentInfo = {
                  id:result.paymentIntent.id,
                  status: result.paymentIntent.status
                }

                dispatch(createOrder(order))

                navigate('/order/success')
              } else {
                window.alert('There is some issues while payment processing')
              }
            }

        } catch (error) {
            document.querySelector('#pay_btn').disabled = false
            console.log(error.response.data);
            window.alert(error.response.data.message)
        }
    }

  return (
    <Fragment>
        <MetaData title={'Payment'} />
        <Fragment>
        <div className="max-w-screen-sm mx-auto mb-40">
      <div className="mx-3 md:mx-20 mt-10 md:mt-24">
      <div className="hidden md:flex justify-center md:mt-8">
            <CheckOutSteps shipping confirmOrder payment/>
          </div>
          <div className="md:hidden flex my-5 justify-center">
            <MobCheckOutSteps shipping confirmOrder payment/>
          </div>
        <div className="bg-gray-900 rounded-xl py-10">
          <div className="md:mx-10 mx-3">
            <form onSubmit={submitHandler}>
              <div className="text-3xl font-extrabold text-blue-600 mb-6">Card Info</div>
              <div className="cardNo mb-4">
                <label htmlFor="cardNoField" className="text-lg font-bold text-gray-400">Card Number</label>
                <CardNumberElement
                  id="cardNoField"
                  type="text"
                  className="block p-2 md:w-full text-white bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                  options={options}
                />
              </div>
              <div className="cardExp mb-4">
                <label htmlFor="cardExpField" className="text-lg font-bold text-gray-400">Card Expiry </label>
                <CardExpiryElement
                  id='cardExpField'
                  type="text"
                  className="block p-2  md:w-full text-white bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                  options={options}
                />
              </div>
              <div className="cardCvc mb-7">
                <label htmlFor="cardCvcField" className="text-lg font-bold text-gray-400">Card CVC </label>
                <CardCvcElement
                  id='cardCvcField'
                  type="text"
                  className="block p-2  md:w-full text-white bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                  options={options}
                />
              </div>

              <button id="pay_btn" type='submit' value='Submit' className="text-2xl font-bold bg-gray-600 hover:bg-blue-600 duration-300 text-gray-300 py-2 rounded-lg w-full mb-2">
                Pay {`  - ${orderInfo && orderInfo.totalPrice}`}
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
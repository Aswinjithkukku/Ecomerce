import React, { Fragment, useState } from "react";
import { useSelector } from 'react-redux'
import { saveShippingInfo } from '../actions/CartAction'
import Loader from '../components/Loader'
import MetaData from '../components/layout/MetaData'
import { useNavigate } from "react-router-dom";
import CheckOutSteps from "../components/CheckOutSteps";

function ConfirmOrders() {

  const { cartItems, shippingInfo } = useSelector(state => state.cart)
  const { user } = useSelector(state => state.auth)

  const navigate = useNavigate()

  const itemPrice = cartItems.reduce((acc, item) => (acc + item.quantity * item.price),0).toFixed(2)
  const shippingPrice = itemPrice > 200 ? 0 : 25
  const taxPrice = Number((0.05 * itemPrice).toFixed(2))
  const totalPrice = (Number(itemPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2)

  const procceedToPayment = () => {
    const data = {
      itemPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    }
    sessionStorage.setItem('orderInfo', JSON.stringify(data))
    navigate('/payment')
  }

  return (
    <Fragment>
          <div className="main">
            <MetaData title={'Confirm Order'} />
            <div className="flex justify-center">
            <CheckOutSteps shipping confirmOrder/>
            </div>
            <div className="md:grid md:grid-cols-4 md:gap-16 mx-3 md:mx-0">
              <div className="col-span-3">
                <h2 className="text-xl md:text-2xl font-semibold">Shipping Info</h2>
                <div className="md:my-7">
                  <p className="mt-2"><span className="md:text-lg text-base font-semibold">Name : {user && user.name} </span></p>
                  <p className="mt-2"><span className="md:text-lg text-base font-semibold">Phone Number : {shippingInfo.phoneNo} </span></p>
                  <p className="mt-2"><span className="md:text-lg text-base font-semibold">Address : {`${shippingInfo.address},${shippingInfo.city},${shippingInfo.postalCode},${shippingInfo.country}`}</span></p>
                </div>
                <h2 className="md:text-2xl text-xl font-semibold mt-1">Your Cart Items</h2>
                <table className="w-full text-left my-5">
                  <tbody>
                  {cartItems.map((item) => (
                      <tr key={item.name} className="border-y-2">
                      <td className="flex items-center w-20 md:w-auto">
                        <img
                          src={item.image}
                          alt={item.name}
                          height="60"
                          width="60"
                        />
                      </td>
                      <td>
                        <span
                          to={`/products/${item.product._id}`}
                          className="md:text-lg font-semibold"
                        >
                          {item.name}
                        </span>
                      </td>
                      <td>
                        <h4 className="md:text-xl font-semibold">{item.quantity} X {item.price} = ${(item.price * item.quantity).toFixed(2)}</h4>
                      </td>
                      </tr>
                  ))}
                    </tbody>
                </table>
              </div>
              <div className="col-span-1">
                <div className="main">
                  <div className="bg-gray-400 rounded-xl">
                    <h1 className="text-xl font-semibold border-b-2">
                      order summary
                    </h1>
                    <div className="grid grid-cols-2 ">
                      <div className="">
                    <h5 className="text-xl font-medium">Subtotal:</h5>
                      </div>
                      <div className="text-right pr-4">
                      ${itemPrice}
                      </div>
                      <div className="">
                    <h5 className="text-xl font-medium">Shipping:</h5>
                      </div>
                      <div className="text-right pr-4">
                        ${shippingPrice}
                      </div>
                      <div className="">
                    <h5 className="text-xl font-medium">Tax:</h5>
                      </div>
                      <div className="text-right pr-4">
                        ${taxPrice}
                      </div>
                      <div className="border-y-2">
                    <h5 className="text-xl font-medium">Total:</h5>
                      </div>
                      <div className="text-right pr-4 border-y-2">
                        ${totalPrice}
                      </div>
                    </div>
                    <div className="flex justify-center">
                    <button  className="rounded-lg w-fit bg-zinc-800 text-white my-4 px-10 py-2" onClick={procceedToPayment}>
                      Procceed to Payment
                    </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
  )
}

export default ConfirmOrders
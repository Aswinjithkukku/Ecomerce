import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getOrderDetails, clearErrors } from '../actions/OrderAction'
import MetaData from "../components/layout/MetaData";
import { Link, useParams } from 'react-router-dom'
import Loader from '../components/Loader'

function OrderDetailsScreen() {

    const dispatch = useDispatch()
    const params = useParams()

    const { loading, error, order } = useSelector(state => state.orderDetails)

    
    
    useEffect(() => {
        dispatch(getOrderDetails(params.id))
        
        if(error) {
            window.alert(error) 
            dispatch(clearErrors())
            
        }
    },[dispatch,error,params.id])
    if (!order) {
        return null
    }
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order



    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country} `

    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false
  return (
    <Fragment>
      <MetaData title={'My Order'} />
    {loading? <Loader /> : (
        <Fragment>
            <div> 
                <div className='mt-10'>
                    <h1 className='text-4xl font-semibold'> Order # 5454864248644684484</h1>
                </div>
                <div className='mt-5 pb-4 border-b-2'>
                    <h2 className='text-xl font-semibold'>Shipping Info</h2>
                    <h3 className='mt-2 ml-3 font-semibold'>Name : <span>{ user && user.name}</span></h3>
                    <h3 className='mt-2 ml-3 font-semibold'>Phone : <span>{shippingInfo && shippingInfo.phoneNo} </span></h3>
                    <h3 className='mt-2 ml-3 font-semibold'>Address : <span>{shippingDetails}</span></h3>
                    <h3 className='mt-2 ml-3 font-semibold'>Amount : <span>${totalPrice}</span></h3>
                </div>
                <div className='pb-4 border-b-2'>
                <div className='mt-5'>
                    <h2 className='text-xl font-semibold'>Payment</h2>
                    {isPaid ? (
                        <h3 className='text-green-600 text-lg font-semibold'>PAID</h3>
                    ) : (
                    <h3 className='text-red-600 text-lg font-semibold'>NOT PAID</h3>
                    )}
                </div>
                <div className='mt-5'>
                    <h2 className='text-xl font-semibold'>Order Status</h2>
                    {orderStatus &&
                    String(orderStatus).includes("Delivered") ? (
                      <p className="text-green-600 text-lg font-semibold">{orderStatus.toUpperCase()}</p>
                    ) : (
                      <p className="text-red-600 text-lg font-semibold">{orderStatus.toUpperCase()}</p>
                    )}
                </div>
                </div>
                <div className=''>
                <table className="w-full text-left ">
                  <tbody className="border-b-2">
                  {orderItems && orderItems.map((item) => (
                      <tr key={item.product}>
                      <td className="flex items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          height="110"
                          width="110"
                        />
                      </td>
                      <td>
                        <Link
                          to={`/products/${item.product}`}
                          className="text-lg font-semibold"
                        >
                          {item.name}
                        </Link>
                      </td>
                      <td>
                        <h4 className="text-xl font-bold">${item.price}</h4>
                      </td>
                      <td>
                        <div className="flex mr-20">
                          {item.quantity} Piece(s)
                        </div>
                      </td>
                      </tr>
                   ))}
                    </tbody>
                </table>
                </div>
            </div>
        </Fragment>
    )}
    </Fragment>
  )
}

export default OrderDetailsScreen
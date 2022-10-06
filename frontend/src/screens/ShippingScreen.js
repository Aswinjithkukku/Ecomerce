import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingInfo } from '../actions/CartAction'
import Loader from '../components/Loader'
import MetaData from '../components/layout/MetaData'
import { useNavigate } from "react-router-dom";
import { countries } from 'countries-list'
import CheckOutSteps from "../components/CheckOutSteps";

function ShippingScreen() {

    const countriesList = Object.values(countries)
    const { shippingInfo } = useSelector(state => state.cart)

    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)
    const [country, setCountry] = useState(shippingInfo.country)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingInfo({
            address,
            city,
            postalCode,
            phoneNo,
            country
        }))
        navigate('/order/confirm')
    }

  return (
    <Fragment>
        <MetaData title={'Shipping Info'}/>
    <div className="max-w-screen-sm mx-auto mb-10">
      <div className="md:mx-20 mx-2 md:mt-48 mt-20">
        <CheckOutSteps shipping />
        <div className="bg-gray-500 rounded-xl">
          <div className="mx-10">
            <form onSubmit={submitHandler}>
              <div className="text-3xl font-extrabold">Shipping Info</div>
              <div className="Address">
                <label htmlFor="addressField" className="text-lg font-bold">Address</label>
                <input
                  id="addressField"
                  type="text"
                  className="block p-2 w-full text-gray-900 bg-gray-50  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="City">
                <label htmlFor="cityField" className="text-lg font-bold">City</label>
                <input
                  id='cityField'
                  type="text"
                  className="block p-2  w-full text-gray-900 bg-gray-50  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  
                />
              </div>
              <div className="Phone Number">
                <label htmlFor="PhoneNumberField" className="text-lg font-bold">Phone Number</label>
                <input
                  id='phoneNumberField'
                  type="number"
                  className="block p-2  w-full text-gray-900 bg-gray-50  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter Phone Number"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  required                  
                />
              </div>
              <div className="Postal Code">
                <label htmlFor="PostalCodeField" className="text-lg font-bold">Postal Code</label>
                <input
                  id='PostalCodeField'
                  type="number"
                  className="block p-2  w-full text-gray-900 bg-gray-50  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter PostalCode"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                />
              </div>
              <div className="Country">
                <label htmlFor="cityField" className="text-lg font-bold">Country</label>
                <select
                  id='cityField'
                  type="text"
                  className="block p-2  w-full text-gray-900 bg-gray-50  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                >
                    {countriesList.map(country => (
                    <option key={country.name} value={country.name}>
                        {country.name}
                    </option>
                    ))}
                </select>
              </div>
              <button type='submit' value='Submit' className="text-2xl mt-6 font-bold bg-slate-300 hover:bg-neutral-300 py-2 rounded-lg w-full">
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </Fragment>
  )
}

export default ShippingScreen
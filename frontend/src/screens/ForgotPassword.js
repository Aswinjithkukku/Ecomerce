import React, { Fragment,useEffect, useState } from 'react'
import MetaData from '../components/layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, forgotPasssword } from '../actions/UserAction'


function ForgotPassword() {

    const dispatch = useDispatch()

    const [ email, setEmail ] = useState('')

    const { loading, error, message } = useSelector(state => state.forgotPassword)

    useEffect(() => {
      if(error) {
        dispatch(clearErrors())
      }
      if(message) {
        window.alert(message)
      }
    },[dispatch,error,message])

    const submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.set('email', email)

        dispatch(forgotPasssword(formData))
    }

  return (
    <Fragment>
        <MetaData title={'Forgot Password'} />
    <div className="max-w-screen-sm mx-auto mb-60 md:mb-80">
      <div className="md:mx-20 mx-3 mt-48">
        <div className="bg-gray-900 rounded-xl py-10">
          <div className="mx-10 ">
            <form onSubmit={submitHandler}>
              <div className="text-3xl font-extrabold text-blue-600 mb-6">Forgot Password</div>
              <div className="email mb-6">
                <label htmlFor="emailField" className="text-lg font-bold text-gray-400 ">Enter Email</label>
                <input
                  id='emailField'
                  type="email"
                  className="block p-2  w-full text-blue-600 bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <button type='submit' value='Submit' className="text-2xl font-bold bg-gray-600 hover:bg-blue-600 duration-300 text-gray-300 py-2 rounded-lg w-full mb-4"
              disabled={loading ? true : false}>
                Send Email
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
    </Fragment>
  )
}

export default ForgotPassword
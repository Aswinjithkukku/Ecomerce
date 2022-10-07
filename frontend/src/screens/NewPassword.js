import React, { Fragment,useEffect, useState } from 'react'
import MetaData from '../components/layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, resetPasssword } from '../actions/UserAction'
import { useNavigate, useParams } from 'react-router-dom'

function NewPassword() {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')

    const { error, success } = useSelector(state => state.forgotPassword)

    useEffect(() => {
      if(error) {
        dispatch(clearErrors())
      }
      if(success) {
        window.alert("Your Password Updated Successfully")
        navigate('/login')
      }
    },[dispatch,error,success,navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.set('password', password)
        formData.set('confirmPassword', confirmPassword)

        dispatch(resetPasssword(params.token, formData))
    }
  return (
    <Fragment>
        <MetaData title={'Reset Password'} />
    <div className="max-w-screen-sm mx-auto mb-64">
      <div className="mx-3 md:mx-20 mt-32 md:mt-48">
        <div className="bg-gray-900 rounded-xl py-10">
          <div className="mx-10">
            <form onSubmit={submitHandler}>
              <div className="text-3xl font-extrabold text-blue-600 mb-6">Reset Password</div>
              <div className="password mb-4">
                <label htmlFor="passwordField" className="text-lg font-bold text-gray-400">Enter Password</label>
                <input
                  id='passwordField'
                  type="password"
                  className="block p-2  w-full text-blue-600 bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="password mb-6">
                <label htmlFor="comfirmPasswordField" className="text-lg font-bold text-gray-400">Confirm Password</label>
                <input
                  id='comfirmPasswordField'
                  type="password"
                  className="block p-2  w-full text-blue-600 bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Re-Enter Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              
              <button type='submit' value='Submit' className="rounded-lg w-full bg-gray-600 hover:bg-blue-600 duration-300 py-2 text-white">
                Reset Password
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
    </Fragment>
  )
}

export default NewPassword
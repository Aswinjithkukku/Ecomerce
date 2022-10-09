import React, { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../components/layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, updatePasssword } from '../actions/UserAction'
import { UPDATE_PASSWORD_RESET } from '../constants/UserConstants'
import Loader from '../components/Loader'

function UpdatePassword() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

    const [ oldPassword, setOldPassword ] = useState('')
    const [ password, setPassword ] = useState('')

    const { error, isUpdated, loading } = useSelector(state => state.user)

    useEffect(() => {
      if(error) {
        dispatch(clearErrors())
      }
      if(isUpdated) {
        window.alert('Password Updated Successfully')
        navigate('/me')
        dispatch({
          type: UPDATE_PASSWORD_RESET
        })
      }
    },[dispatch,error,navigate,isUpdated])

    const submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.set('oldPassword', oldPassword)
        formData.set('password', password)

        dispatch(updatePasssword(formData))
    }
  return (
    <Fragment>
      <MetaData title={'Update Password'} />
      {loading ? (
        <Loader />
      ) : (
        
    <div className="max-w-screen-sm mx-auto mb-56">
      <div className="md:mx-20 mx-3 md:mt-48 mt-24">
        <div className="bg-gray-900 rounded-xl py-10">
          <div className="mx-10">
            <form onSubmit={submitHandler}>
              <div className="text-3xl font-extrabold text-blue-600 mb-6">Update Password</div>
              <div className="password mb-4">
                <label htmlFor="passwordField" className="text-lg font-bold text-gray-400">Old password</label>
                <input
                  id='passwordField'
                  type="password"
                  className="block p-2  w-full text-blue-600 bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter Old password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="password mb-7">
                <label htmlFor="passwordField" className="text-lg font-bold text-gray-400" >New password</label>
                <input
                  id='newpasswordField'
                  type="password"
                  className="block p-2  w-full text-blue-600 bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter New password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type='submit' value='Submit' className="text-2xl font-bold bg-gray-600 hover:bg-blue-600 duration-300 text-gray-300 py-2 rounded-lg w-full mb-4">
                Change Password
              </button>
            <div className="flex justify-end">
              <Link to="/password/forgot" className="text-lg font-bold text-blue-600">
                forgot password?
              </Link>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    
    )}
    </Fragment>
  )
}

export default UpdatePassword
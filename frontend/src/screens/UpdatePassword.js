import React, { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../components/layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, updatePasssword } from '../actions/UserAction'
import { UPDATE_PASSWORD_RESET } from '../constants/UserConstants'

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
    <div className="max-w-screen-sm mx-auto mb-10">
      <div className="mx-20 mt-48">
        <div className="bg-gray-500 rounded-xl">
          <div className="mx-10">
            <form onSubmit={submitHandler}>
              <div className="text-3xl font-extrabold">Update Password</div>
              <div className="password">
                <label htmlFor="passwordField" className="text-lg font-bold">Old password</label>
                <input
                  id='passwordField'
                  type="password"
                  className="block p-2  md:w-full text-gray-900 bg-gray-50  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter Old password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="password">
                <label htmlFor="passwordField" className="text-lg font-bold">New password</label>
                <input
                  id='newpasswordField'
                  type="password"
                  className="block p-2  md:w-full text-gray-900 bg-gray-50  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter New password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type='submit' value='Submit' className="text-2xl font-bold bg-slate-300 hover:bg-neutral-300 py-2 rounded-lg w-full mt-2">
                Change Password
              </button>
            <div className="flex justify-end">
              <Link to="/register" className="text-lg font-bold">
                forgot password?
              </Link>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </Fragment>
  )
}

export default UpdatePassword
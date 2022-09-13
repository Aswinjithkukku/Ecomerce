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
    <div className="max-w-screen-sm mx-auto mb-10">
      <div className="mx-20 mt-48">
        <div className="bg-gray-500 rounded-xl">
          <div className="mx-10">
            <form onSubmit={submitHandler}>
              <div className="text-3xl font-extrabold">Reset Password</div>
              <div className="password">
                <label htmlFor="passwordField" className="text-lg font-bold">Enter Password</label>
                <input
                  id='passwordField'
                  type="password"
                  className="block p-2  md:w-full text-gray-900 bg-gray-50  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="password">
                <label htmlFor="comfirmPasswordField" className="text-lg font-bold">Confirm Password</label>
                <input
                  id='comfirmPasswordField'
                  type="password"
                  className="block p-2  md:w-full text-gray-900 bg-gray-50  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Re-Enter Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              
              <button type='submit' value='Submit' className="text-2xl font-bold bg-slate-300 hover:bg-neutral-300 py-2 rounded-lg w-full mt-2">
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
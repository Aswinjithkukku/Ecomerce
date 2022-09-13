import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors } from '../actions/UserAction'
import Loader from '../components/Loader'
import MetaData from '../components/layout/MetaData'

function LoginScreen() {

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isAuthenticated, error, loading } = useSelector(state => state.auth)

  useEffect(() => {
    if(isAuthenticated) {
      navigate('/') 
    }
    if (error) {
      dispatch(clearErrors());
    }
  },[dispatch,error,isAuthenticated,navigate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email,password))
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
    <Fragment>
      <MetaData title={'Login'}/>
    <div className="max-w-screen-sm mx-auto mb-10">
      <div className="mx-20 mt-48">
        <div className="bg-gray-500 rounded-xl">
          <div className="mx-10">
            <form onSubmit={submitHandler}>
              <div className="text-3xl font-extrabold">Login</div>
              <div className="email">
                <label htmlFor="emailField" className="text-lg font-bold">Email</label>
                <input
                  id="emailField"
                  type="email"
                  className="block p-2 md:w-full text-gray-900 bg-gray-50  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="password">
                <label htmlFor="passwordField" className="text-lg font-bold">password</label>
                <input
                  id='passwordField'
                  type="password"
                  className="block p-2  md:w-full text-gray-900 bg-gray-50  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <Link to="/password/forgot">Forgot Password?</Link>
              </div>
              <button type='submit' value='Submit' className="text-2xl font-bold bg-slate-300 hover:bg-neutral-300 py-2 rounded-lg w-full">
                Login
              </button>
            <div className="flex justify-end">
              <Link to="/register" className="text-lg font-bold">
                New User?
              </Link>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </Fragment>
          )}
    </Fragment>
  );
}

export default LoginScreen;

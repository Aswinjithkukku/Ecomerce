import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { updateProfile, loadUser, clearErrors } from '../actions/UserAction'
import Loader from '../components/Loader'
import MetaData from '../components/layout/MetaData'
import { UPDATE_PROFILE_RESET } from "../constants/UserConstants";

function UpdateProfile() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')

  const [ avatar, setAvatar ] = useState('')
  const [ avatarPreview, setAvatarPreview ] = useState('/images/apple-watch.png')

  const { user } = useSelector(state => state.auth)
  const { error, isUpdated, loading } = useSelector(state => state.user)


  useEffect(() => {

    if(user) {
      setName(user.name)
      setEmail(user.email)
      if(user.avatar){
          setAvatarPreview(user.avatar.url)
      }
    }
    if (error) {
        console.log(error);
      dispatch(clearErrors());
    }
    if(isUpdated) {
        window.alert('User Updated Successfully')
        dispatch(loadUser())

        navigate('/me')

        dispatch({ type: UPDATE_PROFILE_RESET})
    }
  },[dispatch,user,error,isUpdated,navigate])

  const onChange = (e) => {

      const reader = new FileReader()

      reader.onload = () => {
        if(reader.readyState === 2) {
          setAvatarPreview(reader.result)
          setAvatar(reader.result)
        }
      }
      reader.readAsDataURL(e.target.files[0])
      
  }

  const submitHandler = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.set('name', name)
    formData.set('email', email)
    formData.set('avatar', avatar)

    dispatch(updateProfile(formData))
  }
  return (
    <Fragment>
        <MetaData title={'Update Profile'} />
        {loading ? (
          <Loader />
        ) : (
        <Fragment>
          <div className="max-w-screen-sm mx-auto mb-10">
            <div className="md:mx-20 mx-3 md:mt-48 mt-24">
              <div className="bg-gray-900 rounded-xl py-10">
                <div className="mx-10">
                  <div className="text-3xl font-extrabold text-blue-600 mb-6">Update Profile</div>
                  <form onSubmit={submitHandler} encType="multipart/form-data">
                    <div className="Name mb-4">
                      <label htmlFor="input-name" className="text-lg font-bold text-gray-400">
                        Name
                      </label>
                      <input
                        type="name"
                        className="block p-2 w-full text-white bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter Name"
                        id="input-name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="email mb-4">
                      <label
                        htmlFor="input-email"
                        className="text-lg font-bold text-gray-400"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="block p-2 w-full text-white bg-gray-400  border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter email"
                        id="input-email"
                        name="email"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)} 
                      />
                    </div>
                    <div className="avatar mb-7">
                      <label className="text-lg font-bold text-gray-400">Avatar</label>
                      <div className="flex justify-between">
                        <span className="preview-avatar">
                          <img
                            className="p-1 w-10 h-10 rounded-full ring-2 ring-gray-300"
                            src={avatarPreview}
                            alt="avatar preview"
                          />
                        </span>
                        <span className="upload-avatar ml-3">
                          <input
                      className="block w-full text-lg text-white bg-gray-400  border-2 border-gray-700 cursor-pointer focus:outline-none  "
                      id="input-avatar"
                      type="file"
                      name="avatar"
                      accept="images/*"
                      onChange={onChange}
                    />
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      value="Submit"
                      className="text-2xl font-bold bg-gray-600 hover:bg-blue-600 duration-300 text-gray-300 py-2 rounded-lg w-full mb-2"
                      disabled={loading ? true : false}
                    >
                      Update
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
        )}
    </Fragment>
  )
}

export default UpdateProfile
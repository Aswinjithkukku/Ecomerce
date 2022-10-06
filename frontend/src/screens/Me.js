import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MetaData from '../components/layout/MetaData'
import Loader from '../components/Loader'

function Me() {

  const { user, loading } = useSelector(state => state.auth)

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment> 
      <MetaData title={'Your Profile'}/>
        <div className='my-5'>
            <div className='text-3xl font-extrabold text-center'>My Profile</div>
            <div className='md:grid md:grid-cols-2 gap-4'>
                <div className='left  mt-7'>
                    <div className='flex justify-center'>
                    <img src={user.avatar ? user.avatar.url : '/images/apple-watch.png'} alt={user.name}
                    className=' w-96' style={{borderRadius: "100%"}}/>
                    </div>
                    <div className='flex justify-center'>
                      <Link to='/me/update'>
                    <button className='w-96 rounded-lg p-2 bg-slate-600 text-center'>Edit Profile</button>
                      </Link>
                    </div>
                </div>
                <div className='right'>
                    <div className='mx-16'>
                    <Fragment>
                    <div className="Name">
                <label className="text-lg font-bold">Name</label>
                <h4 className='text-xl font-semibold'>{user.name} </h4>

              </div>
              <div className="email">
                <label className="text-lg font-bold">Email</label>
                <h4 className='text-xl font-semibold'>{user.email} </h4>

              </div>
              <div className="password">
                <label className="text-lg font-bold">Joined On</label>
                <h4 className='text-lg font-semibold'>{String(user.createdAt).substring(0,10)} </h4>
              </div>
              {user.role !== 'admin' && (
                
              <Link to='/orders/me' className='flex justify-center my-1'>
                    <button className='w-full rounded-lg p-2 bg-slate-600 text-center'>My Order</button>
              </Link>
              
              )}
              <div>
              <Link to='/password/update' className='flex justify-center'>
                    <button className='w-full rounded-lg p-2 bg-slate-600 text-center'>Change Password</button>
              </Link>
              </div>
                    </Fragment>
                </div>
                </div>
            </div>
        </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Me
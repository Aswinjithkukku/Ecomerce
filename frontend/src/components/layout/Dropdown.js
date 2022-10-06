import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../actions/UserAction'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


function Dropdown() {
  
  const dispatch = useDispatch()
  const { user, loading } = useSelector(state => state.auth)
  
  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <Fragment>
    <Menu as="div" className="relative inline-block text-left ">
      <div className='group '>
        <Menu.Button className="inline-flex w-full justify-center  text-sm font-medium shadow-sm ">
        {user ? (
      <div className='inline-flex px-3 py-2  bg-blue-600 group-hover:bg-gray-600 duration-300 rounded-md'>
        <div>
          <figure className='flex'>
            <img 
            src='/images/apple-watch.png' 
            alt={user && user.name}
            className='rounded-full w-6 h-6 mr-1'
            />
            <span className='text-gray-300 ml-1 '>{user && user.name}</span>
          </figure>
        </div>
      </div>
    ) : (
      !loading && 
      <Link to="/login">
    <span className='px-3 py-2 m-2 bg-slate-400 text-white rounded-lg' >Login</span>
    </Link>
    )}

        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">


            <Menu.Item>
              {({ active }) => (
                <Link
                  to='/dashboard'
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Dashboard
                </Link>
              )}
            </Menu.Item>
          

            <Menu.Item>
              {({ active }) => (
                <Link
                  to='/orders/me'
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Orders
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to='/me'
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Profile
                </Link>
              )}
            </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to='/'
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-left text-sm'
                    )}
                    onClick={logoutHandler}
                  >
                    Log out
                  </Link>
                )}
              </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>

    </Fragment>
  )
}

export default Dropdown
import React, { Fragment } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

function AdminRoutes({isAdmin, children}) {
    
    const { user } = useSelector(state => state.auth)
    
  return (
    <Fragment>
                { isAdmin === true && user.role !== 'admin' 
                 ? <Navigate to='/' replace/> : (children ? children : <Outlet />) 
            }
    </Fragment>
  )
}

export default AdminRoutes
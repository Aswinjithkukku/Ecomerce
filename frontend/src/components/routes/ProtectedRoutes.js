import React, { Fragment } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

function ProtectedRoutes({ children}) {

    const { isAuthenticated, loading } = useSelector(state => state.auth)

    return (
        <Fragment>

            {loading === false && (
                !isAuthenticated ? <Navigate to='/login' replace/> : (children ? children : <Outlet />) 
            )}
        </Fragment>
        )
    }
    
    export default ProtectedRoutes

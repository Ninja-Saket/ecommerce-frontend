import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserRoute = () => {
    const location = useLocation()
    const user = useSelector((state) => state.user)
    return user && user.token ? <Outlet/> : <Navigate to="/login" replace state={{from : location}}/>
}

export default UserRoute;
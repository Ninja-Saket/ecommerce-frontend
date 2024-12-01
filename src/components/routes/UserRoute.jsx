import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoadingToRedirect from './LoadingToRedirect'

const UserRoute = () => {
    const user = useSelector((state) => state.user)
    return user && user.token ? <Outlet/> : <LoadingToRedirect/>
}

export default UserRoute;
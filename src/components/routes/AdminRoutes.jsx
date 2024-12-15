import React, {useEffect, useState} from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoadingToRedirect from './LoadingToRedirect'
import { currentAdmin } from '../../apiCalls/auth'

const AdminRoute = () => {
    const user = useSelector((state) => state.user)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(()=> {
        const checkAdminStatus = async ()=> {
            if(user && user.token){
                try{
                    const result = await currentAdmin(user.token)
                    console.log('Current Admin', result)
                    setIsAdmin(true)
                }catch(err){
                    console.log('Admin Route Error', err)
                    setIsAdmin(false)
                }
            }
        }
        checkAdminStatus()
    }, [user])

    return isAdmin ? <Outlet/> : <LoadingToRedirect/>
}

export default AdminRoute;
import React, {useEffect, useState} from 'react'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {ToastContainer} from 'react-toastify'
import {useDispatch} from 'react-redux'
import {auth} from './firebase'
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/Home'
import Header from './components/nav/Header'
import RegisterComplete from './pages/auth/RegisterComplete'
import ForgotPassword from './pages/auth/ForgotPassword'
import { currentUser } from './apiCalls/auth'
import History from './pages/user/History'
import UserRoute from './components/routes/UserRoute'
import Password from './pages/user/Password'
import Wishlist from './pages/user/Wishlist'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminRoute from './components/routes/AdminRoutes'
import CreateCategory from './pages/admin/category/CreateCategory'
import UpdateCategory from './pages/admin/category/UpdateCategory'

const App = ()=> {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  // check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      try{
        if(user){
          const idTokenResult = await user.getIdTokenResult()
          const result1 = await currentUser(idTokenResult.token)
          if(result1){
            console.log("Current User Res", result1)
            dispatch({
                type : 'LOGGED_IN_USER',
                payload : {
                    name : result1.data.name,
                    email : result1.data.email,
                    token : idTokenResult.token,
                    role : result1.data.role,
                    _id : result1.data._id
                }
            })
          }
        }else{
          dispatch({
            type : 'LOGOUT',
            payload : null
          })
        }
      }catch(err){
        console.log(err)
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])
  return loading ? (<h4 className='text-danger'>Loading...</h4>) : (
    <Router>
      <Header />
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/register/complete' element={<RegisterComplete/>}/>
        <Route path='/forgot/password' element={<ForgotPassword/>}></Route>
        <Route path='/user/' element={<UserRoute/>}>
          <Route path='history' element={<History/>}/>
          <Route path='password' element={<Password/>}/>
          <Route path='wishlist' element={<Wishlist/>}/>
        </Route>
        <Route path='/admin/' element={<AdminRoute/>}>
          <Route path='dashboard' element={<AdminDashboard/>}/>
          <Route path='category' element={<CreateCategory/>}/>
          <Route path='category/:slug' element={<UpdateCategory/>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

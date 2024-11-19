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

const App = ()=> {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  // check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if(user){
        const idTokenResult = await user.getIdTokenResult()
        dispatch({
          type : 'LOGGED_IN_USER',
          payload : {
            email : user.email,
            token : idTokenResult.token
          }
        })
      }else{
        dispatch({
          type : 'LOGOUT',
          payload : null
        })
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
      </Routes>
    </Router>
  )
}

export default App

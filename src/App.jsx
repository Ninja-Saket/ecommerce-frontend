import React, {useEffect, useState} from 'react'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {ToastContainer} from 'react-toastify'
import {useDispatch} from 'react-redux'
import _ from 'lodash'
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
import CreateSubCategory from './pages/admin/subCategory/CreateSubCategory'
import UpdateSubCategory from './pages/admin/subCategory/UpdateSubCategory'
import CreateProduct from './pages/admin/product/CreateProduct'
import AllProducts from './pages/admin/product/AllProducts'
import UpdateProduct from './pages/admin/product/UpdateProduct'
import Product from './pages/Product'
import CategoryHome from './pages/category/CategoryHome'
import SubCategoryHome from './pages/subCategory/subCategoryHome'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import SideDrawer from './components/drawer/SideDrawer'
import Checkout from './pages/Checkout'
import CreateCoupon from './pages/admin/coupon/CreateCoupon'
import Payment from './pages/Payment'
import PaymentSuccess from './pages/PaymentSuccess'

const App = ()=> {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  const syncCartToRedux = () => {
      if (typeof window !== "undefined") {
        if (!!localStorage.getItem("cart")) {
          const cart = JSON.parse(localStorage.getItem("cart"));
          const unique = _.uniqWith(cart, _.isEqual);
          localStorage.setItem("cart", JSON.stringify(unique));
          dispatch({
            type: "ADD_TO_CART",
            payload: unique,
          });
        }
      }
    };

  // sync any cart from local storage to redux
  useEffect(()=> {
    syncCartToRedux()
  }, [])
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
      <SideDrawer/>
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
          <Route path='checkout' element={<Checkout/>}/>
          <Route path='payment' element={<Payment/>}/>
          <Route path='paymentsuccess' element={<PaymentSuccess/>}/>
        </Route>
        <Route path='/admin/' element={<AdminRoute/>}>
          <Route path='dashboard' element={<AdminDashboard/>}/>
          <Route path='category' element={<CreateCategory/>}/>
          <Route path='category/:slug' element={<UpdateCategory/>} />
          <Route path='subCategory' element={<CreateSubCategory/>}/>
          <Route path='subCategory/:slug' element={<UpdateSubCategory/>} />
          <Route path='product' element={<CreateProduct/>}/>
          <Route path='products' element={<AllProducts/>}/>
          <Route path='product/:slug' element={<UpdateProduct/>}/>
          <Route path='coupon' element={<CreateCoupon/>}/>
        </Route>
        <Route path='/product/:slug' element={<Product/>}/>
        <Route path='/category/:slug' element={<CategoryHome/>}/>
        <Route path='/subCategory/:slug' element={<SubCategoryHome/>}/>
        <Route path='/shop' element={<Shop/>}/>
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
    </Router>
  )
}

export default App

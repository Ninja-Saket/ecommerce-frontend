import React from 'react'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/Home'
import Header from './components/nav/Header'

const App = ()=> {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Register' element={<Register/>}/>
      </Routes>
    </Router>
  )
}

export default App

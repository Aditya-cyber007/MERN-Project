import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React,{useEffect, useState} from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Error from './pages/Error'
import Logout from './components/Logout'
import Footer from './pages/Footer'
import CustomerHome from './pages/CustomerHome'

function App() {
  const[navbar,setNavbar]=useState(true)
  const hideNavbar=()=>{
    setNavbar(false)
  }
  const showNavbar=()=>{
    setNavbar(true)
  }
  return (                        
    <>
    <BrowserRouter>
    {navbar?<Navbar/>:null}
    <Routes>
    
      <Route path="/" element={<Home showNavbar={showNavbar} />}/>
      <Route path="/signup" element={<Signup hideNavbar={hideNavbar}/>}/>
      <Route path="/login" element={<Login hideNavbar={hideNavbar}/>}/>
      <Route path="*" element={<Error  hideNavbar={hideNavbar}/>}/>
      <Route path="/logout" element={<Logout/>}/>
      <Route path="/login/:seller" element={<Login hideNavbar={hideNavbar}/>}/>
      <Route path="/signup/:seller" element={<Signup hideNavbar={hideNavbar}/>}/>
      <Route path="/customer" element={<CustomerHome showNavbar={showNavbar}/>}/>
      </Routes>

    {navbar?<Footer/>:null}

    </BrowserRouter>

    </>
  )
}

export default App

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React,{useEffect, useState} from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Error from './pages/Error'
import Logout from './components/Logout'

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
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="*" element={<Error  hideNavbar={hideNavbar}/>}/>
      <Route path="/logout" element={<Logout/>}/>
    </Routes>
    </BrowserRouter>

    </>
  )
}

export default App

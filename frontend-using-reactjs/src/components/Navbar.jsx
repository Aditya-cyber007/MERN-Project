import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { getToken, getUserData } from '../features/Auth'

const Navbar = () => {

  const navigate=useNavigate()
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  dispatch(getUserData(token))
  const isLogged = () => {
    if (token) {
      return true
    }
    return false
  }
  const handleLogout = () => {
    navigate('/logout')
  }

  const handleLogin = () => {
    navigate('/login')
  }


  


  return (
    <div >
    <nav className="navbar navbar-expand-lg "
    data-testid="navbar"
    style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}    >
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">Navbar</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
        </li>
      </ul>

      {isLogged() ?
        <button className="btn btn-outline-danger" onClick={handleLogout} >Logout</button>
        : 
        <button className="btn btn-outline-info" onClick={handleLogin} >Login</button>
      }
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
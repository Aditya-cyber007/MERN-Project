import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = ({showNavbar}) => {
  const navigate = useNavigate()
  const token = useSelector(state => state.auth.token)
  const isLogged = () => {
    if (token) {
      return true
    }
    navigate('/login')
  }  
  useEffect(() => {
    isLogged()
    showNavbar()
  }, [])

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center">Home</h1>
             <p className="text-center">Welcome </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
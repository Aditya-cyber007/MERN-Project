import React, { useEffect } from 'react'
import '../styles/ErrorPageStyle.css'
import { useNavigate } from 'react-router-dom'

const Error = ({hideNavbar}) => {
    const navigate =useNavigate()
    useEffect(() => {
        hidenav()
    }, [])
    const hidenav=()=>{
        hideNavbar()
    }
  return (
    <div>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"/>
<div className="page-404">
<div className="outer">
<div className="middle">
    <div className="inner">
        
        <div className="inner-circle"><i className="fa fa-home"></i><span>404</span></div>
        <h4 className="inner-title">Page Not Found</h4>
        <span className="inner-status">Oops! You're lost</span>
        <span className="inner-detail">
            We can not find the page you're look'ing for.
            <button onClick={()=>{navigate("/")}} className="btn btn-info mtl"><i className="fa fa-home"></i>&nbsp;
                Return home
            </button> 
        </span>
    </div>
</div>
</div>
</div>
</div>
  )
}

export default Error
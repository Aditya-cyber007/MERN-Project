import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteToken } from '../features/Auth'

const Logout = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(deleteToken())
    }, [dispatch])

  return <Navigate to="/login" />
}

export default Logout
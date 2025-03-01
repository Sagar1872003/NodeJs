import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
const { auth , setAuth} = useAuth()

  return auth?.token ? <Outlet /> : <Navigate to={'/'} />
}

export default PrivateRoute

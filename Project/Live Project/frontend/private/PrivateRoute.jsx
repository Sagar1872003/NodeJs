import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = ({ allowedRoles }) => {
    const [ auth , setAuth ] = useAuth();
  

    if (!auth?.token) {
        return <Navigate to={'/'} />;
    }

    const userrole = auth?.token?.user?.role
    
    if (allowedRoles && !allowedRoles.includes(userrole)) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
}

export default PrivateRoute;

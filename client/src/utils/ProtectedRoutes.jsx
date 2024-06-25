import React, { useContext } from 'react'
import { AppContext } from '../context/ProviderContext'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
    const { userInfo } = useContext(AppContext);
  return userInfo ? <Outlet /> :  <Navigate to={"/"} />
}

export default ProtectedRoutes
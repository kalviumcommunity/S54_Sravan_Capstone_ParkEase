import React, { useContext } from 'react'
import { AppContext } from '../context/ProviderContext'
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ element }) => {
    const { userInfo } = useContext(AppContext);
  return userInfo ? element :  <Navigate to={"/"} />
}

export default ProtectedRoutes
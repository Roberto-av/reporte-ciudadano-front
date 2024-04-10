import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Services/AuthContext';

export default function ProtectedRoute() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn){
    return <Navigate to="/login" replace />
  }

  return(
    <div>
        <Outlet />
    </div>
  )
}

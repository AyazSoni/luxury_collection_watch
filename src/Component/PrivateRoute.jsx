// src/components/PrivateRoute.jsx

import React, { useContext } from 'react';
import { Route, Navigate , Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const PrivateRoute = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return (
     <div>
    {currentUser ? <Outlet /> :
    <Navigate to="/admin/login" />
    }
    </div>
  );
};

export default PrivateRoute;

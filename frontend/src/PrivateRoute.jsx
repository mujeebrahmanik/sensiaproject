import React, { useContext } from 'react'
import { AuthContext } from './AuthProvider'
import { Navigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const PrivateRoute = ({children,permissions = {}}) => {
    const location=useLocation();
    const{loggedIn,myPermission}=useContext(AuthContext)

    if (!loggedIn) return <Navigate to='/login'/>
      if (myPermission === null || myPermission === undefined) {
    return <div>Loading...</div>; 
  }

    for(const [perm,val] of Object.entries(permissions)){
      if(val && !myPermission[perm]){
        return <Navigate to="/unauthorized" replace />;
      }
    }

    return children
}

export default PrivateRoute

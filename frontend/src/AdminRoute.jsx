import React, { useContext } from 'react'
import { AuthContext } from './AuthProvider'
import { Navigate } from 'react-router-dom'

const AdminRoute = ({children}) => {
    const {loggedIn,user}=useContext(AuthContext)

    return loggedIn && user.is_staff ?(
        children
      ):(
        <Navigate to='/admin/login'/>
      )
}

export default AdminRoute

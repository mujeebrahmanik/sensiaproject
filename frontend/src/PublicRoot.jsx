import React from 'react'
import { useContext } from 'react'
import { AuthContext } from './AuthProvider'
import { Navigate } from 'react-router-dom'

const PublicRoot = ({children}) => {
    const {loggedIn}=useContext(AuthContext)

    return loggedIn ? (
            <Navigate to='/' />
        ):(
            children
      )
 
}

export default PublicRoot

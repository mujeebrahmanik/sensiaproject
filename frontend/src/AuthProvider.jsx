import React, { useState, useContext, createContext, useEffect } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'


const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const location = useLocation();

  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem('accessToken')
  )

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user')
    return storedUser ? JSON.parse(storedUser) : null
  })

  const [myPermission, setMyPermission] = useState(null)

  const fetchPermission = async () => {
      try {
        const token = localStorage.getItem('accessToken')
        if (!token) return

        const response = await axios.get('http://127.0.0.1:8000/api/my_permission/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setMyPermission(response.data)
        console.log("Fetched Permissions:", response.data)
      } catch (error) {
        console.error("Error fetching permissions:", error)
      }
    }

  useEffect(() => {
    if (loggedIn) {
      fetchPermission()
    }
  }, [loggedIn,location]) 
  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        user,
        setUser,
        myPermission,
        setMyPermission,
        fetchPermission
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
export { AuthContext }

import React, { useState,useContext } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../../AuthProvider'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const[username,setUsername]=useState('')
    const[password,setPassword]=useState('')
    const[error,setError]=useState('')
    const[loading,setLoading]=useState(false)
    const{loggedIn,setLoggedIn,user,setUser}=useContext(AuthContext)
    const navigate=useNavigate()

    const handleSubmit=async(e)=>{
        e.preventDefault()
                const userData={username,password}
                setLoading(true)
                try {
                    const responce=await axios.post('http://127.0.0.1:8000/api/superuser-token/',userData)
                    localStorage.setItem('accessToken',responce.data.access)
                    localStorage.setItem('refreshToken',responce.data.refresh)
                    setError('')
        
                    console.log('welcome Super User')
                    setLoggedIn(true)

                    const access=localStorage.getItem('accessToken')

                    const user_responce=await axios.get('http://127.0.0.1:8000/api/current_user/',{
                        headers: {
                            Authorization: `Bearer ${access}`,
                        },
                    });
                    localStorage.setItem('user',JSON.stringify(user_responce.data))
                    setUser(user_responce.data)

                    navigate('/admin/dashboard')


                    
                } catch (error) {
                    console.error('failed',error)
                    setError('You are Not authorized to Admin dashboard')
                }
                 finally{
                    setLoading(false)
                }
       
    }
  return (
    <>
        <div className="row d-flex justify-content-center align-items-center min-vh-100">
            <div className="col-4"></div>
            <div className="col-4">
                <h2 className='text-center mb-3'>Admin Login</h2>
                <form action="" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" name='username' value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                {error && <h5 className='text-danger text-center mb-3'>{error}</h5>}
                {loading ? (
                                <button type="submit" className="btn btn-primary form-control"><FontAwesomeIcon icon={faSpinner} /> Logging in</button>

                ):(
                                    <button type="submit" className="btn btn-primary form-control">Login</button>

                )}            </form>
            </div>
            <div className="col-4"></div>
        </div>
    </>
  )
}

export default Login
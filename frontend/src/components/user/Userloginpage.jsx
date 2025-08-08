import React,{useState,useContext} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../../AuthProvider'

const Userloginpage = () => {

    let navigate=useNavigate()

    const[username,setUsername]=useState('')
    const[password,setPassword]=useState('')
    const[error,setError]=useState('')
    const[loading,setLoading]=useState(false)
    const { loggedIn, setLoggedIn, user, setUser } = useContext(AuthContext);

    
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const userData={username,password}
        setLoading(true)
        try {
            const responce=await axios.post('http://127.0.0.1:8000/api/token/',userData)
            const { access, refresh } = responce.data;
            localStorage.setItem('accessToken',responce.data.access)
            localStorage.setItem('refreshToken',responce.data.refresh)
            setError('')
            navigate('/')
            setLoggedIn(true)


            const user_responce=await axios.get('http://127.0.0.1:8000/api/current_user/',{
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            });
            localStorage.setItem('user',JSON.stringify(user_responce.data))
            setUser(user_responce.data)
            

        } catch (error) {
            console.error('failed',error)
            setError('invalid credentials')
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
                <h2 className='text-center mb-3'>User Login</h2>
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
                                    <button type="submit" className="btn btn-primary form-control">Submit</button>

                )}
            </form>
            </div>
            <div className="col-4"></div>
        </div>
    
    </>
    
  )
}

export default Userloginpage
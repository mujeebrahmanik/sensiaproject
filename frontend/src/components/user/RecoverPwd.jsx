import React,{useState,useContext} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../../AuthProvider'

const RecoverPwd = () => {
    const[username,setUsername]=useState('')
    const[success,setSuccess]=useState(false)
    const[loading,setLoading]=useState(false)
    const[error,setError]=useState('')


    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true)
        setError('')

        try {
            const response=await axios.post('http://127.0.0.1:8000/api/recover_password/',{username})
            setSuccess(true)
        } catch (error) {
            console.error(error)
            setError(error.response.data.error)
            setSuccess(false)
        }finally{
            setLoading(false)
        }
    }
  return (
    <>
      <div className="row d-flex justify-content-center align-items-center min-vh-100">
                  <div className="col-4"></div>
                  <div className="col-4">
                      <h2 className='text-center mb-5'>Recover Password</h2>
                      {success && <h6 className='text-success mb-5'>The Password has been sent to your registered Mail, Kindly please Check</h6>}
                        {error && <h5 className='text-danger text-center mb-3'>{error}</h5>}

                      <form action="" onSubmit={handleSubmit}>
                      <div className="mb-3">
                          <label for="exampleInputEmail1" className="form-label">Enter Username</label>
                          <input type="text" className="form-control" id="username" name='username' value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                      </div>
                      {loading ? (
                                      <button type="submit" className="btn btn-primary form-control fw-bold"><FontAwesomeIcon icon={faSpinner} /> Please Wait</button>
      
                      ):(
                                          <button type="submit" className="btn btn-primary form-control fw-bold">Send Recovery Mail</button>
      
                      )}
                  </form>
                  </div>
                  <div className="col-4"></div>
              </div>
    </>
  )
}

export default RecoverPwd

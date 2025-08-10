import React,{useState,useContext} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../../AuthProvider'
import { useParams } from 'react-router-dom'

const ResetPassword = () => {

    const[password,setPassword]=useState('')
    const[success,setSuccess]=useState(false)
    const[loading,setLoading]=useState(false)
    const[error,setError]=useState('')
    const {uid,token}=useParams()


    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true)

        try {
            const response=await axios.post(`http://127.0.0.1:8000/api/reset_password/${uid}/${token}/`,{password})
            setSuccess(true)
            setError('')
        } catch (error) {
            console.error(error)
            setError(error.response.data.error)
            setSuccess(false)
            setPassword('')
        }finally{
            setLoading(false)
        }
    }
  return (

    <>
      <div className="row d-flex justify-content-center align-items-center min-vh-100">
                        <div className="col-4"></div>
                        <div className="col-4">
                            <h2 className='text-center mb-5'>Reset Password</h2>
                            {success && <h6 className='text-success text-center'>The Password has been Reseted Successfully. Please Login  </h6>}
                              {error && <h5 className='text-danger text-center mb-3'>{error}</h5>}
      
                            <form action="" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Enter New Password</label>
                                <input type="password" className="form-control" id="password" name='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                            </div>
                            {loading ? (
                                            <button type="submit" className="btn btn-primary form-control fw-bold"><FontAwesomeIcon icon={faSpinner} /> Please Wait</button>
            
                            ):(
                                                <button type="submit" className="btn btn-primary form-control fw-bold">Reset Password</button>
            
                            )}
                        </form>
                        </div>
                        <div className="col-4"></div>
                    </div>
    </>
  )
}

export default ResetPassword

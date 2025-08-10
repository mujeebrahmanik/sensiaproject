import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom';

const EditUser = () => {

    const [username,setUsername]=useState('')
    const [firstName,setFirstName]=useState('')
    const [lastName,setLastName]=useState('')
    const [email,setEmail]=useState('')
    const [success,setSuccess]=useState(false)
    const [error,setError]=useState('')
    const [loading,setLoading]=useState(false)
    const {id}=useParams()

    useEffect(()=>{
        const fetchData=async(e)=>{
            try {
                const Token=localStorage.getItem('accessToken')
                const response=await axios.get(`http://127.0.0.1:8000/api/edit_user/${id}/`,{
                     headers:{
                            Authorization:`Bearer ${Token}`
                        }
                })
                setFirstName(response.data.first_name)
                setLastName(response.data.last_name)
                setUsername(response.data.username)
                setEmail(response.data.email)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    },[])


    const handleSubmit=async(e)=>{
        e.preventDefault()
        setLoading(true)

        try {
            const Data={username:username,first_name:firstName,last_name:lastName,email:email}
            const Token=localStorage.getItem('accessToken')
            const response=await axios.put(`http://127.0.0.1:8000/api/edit_user/${id}/`,Data,
                {
                        headers:{
                            Authorization:`Bearer ${Token}`
                        }
                }
            )
            setSuccess(true)
            setError('')
            
        } catch(error) {
            setSuccess(false)
            setError(error.response.data)

        }finally{
            setLoading(false)
        }

    }
  return (
    <>
      <div className="container py-5">
                  <div className="row">
                      <h3 className='text-center fw-bold'>Edit Users</h3>
                  </div>
                  <div className="row">
                              <div className="col-4"></div>
                              <div className="col-4">
                                  {success && <h5 className='text-success text-center my-5'>User Edited Successfully...</h5>
                                  }
                                  
                                  <form action="" onSubmit={handleSubmit}>
                                  <div className="mb-3">
                                      <label for="exampleInputEmail1" className="form-label">FirstName</label>
                                      <input  type='text' className="form-control" id="FirstName" name='FirstName' value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
                                  </div>
                                  <div className="mb-3">
                                      <label for="exampleInputEmail1" className="form-label">LastName</label>
                                      <input  type='text' className="form-control" id="LastName" name='LastName' value={lastName} onChange={(e)=>{setLastName(e.target.value)}}/>
                                  </div>
                                  <div className="mb-3">
                                      <label for="exampleInputEmail1" className="form-label">Username</label>
                                      <input  type='text' className="form-control" id="username" name='username' value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                                      {error.username && <h5 className='text-danger  my-4'>{error.username}</h5>}
      
                                  </div>
                                  <div className="mb-3">
                                      <label for="exampleInputEmail1" className="form-label">Email</label>
                                      <input  type='email' className="form-control" id="email" name='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                                  </div>
      
                                  {loading?(
                                                                  <button type="submit" className="btn btn-primary form-control" disabled> <FontAwesomeIcon icon={faSpinner} />Please Wait</button>
      
                                  ):(
                                                                  <button type="submit" className="btn btn-primary form-control">Submit</button>
      
                                  )}
                                  </form>
                              </div>
                              <div className="col-4"></div>
                          </div>
              </div>
    </>
  )
}

export default EditUser

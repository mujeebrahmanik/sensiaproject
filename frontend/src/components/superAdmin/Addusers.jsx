import React, { useState } from 'react'
import axios from 'axios';

const Addusers = () => {
    const [username,setUsername]=useState('')
    const [firstName,setFirstName]=useState('')
    const [lastName,setLastName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const[success,setSuccess]=useState(false)
    const [error,setError]=useState('')


    const handleSubmit=async(e)=>{
        e.preventDefault()

        try {
            const Data={username:username,first_name:firstName,last_name:lastName,email:email,password:password}
            const Token=localStorage.getItem('accessToken')
            const response=await axios.post('http://127.0.0.1:8000/api/users/',Data,
                {
                        headers:{
                            Authorization:`Bearer ${Token}`
                        }
                }
            )
            setSuccess(true)
            setError('')
            setFirstName('')
            setLastName('')
            setUsername('')
            setEmail('')
            setPassword('')
            
        } catch(error) {
            setSuccess(false)
            setError(error.response.data)

        }

    }

  return (
     <>
      <div className="container py-5">
            <div className="row">
                <h3 className='text-center'>Add Users</h3>
            </div>
            <div className="row">
                        <div className="col-4"></div>
                        <div className="col-4">
                            {success && <h5 className='text-success text-center my-5'>User Added Successfully...</h5>
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

                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Password</label>
                                <input  type='password' className="form-control" id="password" name='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                                {error.password && <h5 className='text-danger  my-4'>{error.password}</h5>}

                            </div>

                            <button type="submit" className="btn btn-primary form-control">Submit</button>
                            </form>
                        </div>
                        <div className="col-4"></div>
                    </div>
        </div>
    </>
  )
}

export default Addusers

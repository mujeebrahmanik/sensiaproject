import React, { useState } from 'react'
import axios from 'axios';

const AddPermission = () => {
  return (
    <>
      <div className="container py-5">
            <div className="row">
                <h3 className='text-center'>Add Permission</h3>
            </div>
            <div className="row">
                        <div className="col-4"></div>
                        <div className="col-4">
                            {success && <h5 className='text-success text-center my-5'>Permission Changed Successfully...</h5>
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

export default AddPermission
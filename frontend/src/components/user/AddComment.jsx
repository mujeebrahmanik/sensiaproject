import React, { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import axios from 'axios';


const AddComment = () => {
    const[comment,setComment]=useState('')
    const[userId,setUserId]=useState('')
    const[success,setSuccess]=useState(false)

    

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const Data={comment,user:userId}
        try {
            const Token=localStorage.getItem('accessToken')

            const responce=await axios.post('http://127.0.0.1:8000/api/comments/',Data,

                {
                        headers:{
                            Authorization:`Bearer ${Token}`
                        }
                    }
            )
           setSuccess(true)
           setComment('')
        } catch (error) {
            console.error(error)
            setSuccess(false)
            
        }
    }
  return (
    <>
      <div className="container py-5">
            <div className="row">
                <h3 className='text-center'>Add Comment</h3>
            </div>
            <div className="row">
                        <div className="col-4"></div>
                        <div className="col-4">
                            {success && <h5 className='text-success text-center my-5'>Comment Added Successfully...</h5>
                            }
                            
                            <form action="" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Comment</label>
                                <textarea className="form-control" id="comment" name='comment' value={comment} onChange={(e)=>{setComment(e.target.value)}}/>
                            </div>
                            {/* {error && <h5 className='text-danger text-center mb-3'>{error}</h5>} */}
                            <button type="submit" className="btn btn-primary form-control">Submit</button>
                            </form>
                        </div>
                        <div className="col-4"></div>
                    </div>
        </div>
    </>
  )
}

export default AddComment

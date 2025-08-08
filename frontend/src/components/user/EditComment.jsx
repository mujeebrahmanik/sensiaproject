import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditComment = () => {
    const[comment,setComment]=useState('')
    const[success,setSuccess]=useState(false)

    const {id}=useParams()
    useEffect(()=>{
        const fetchData=async()=>{
            try {
            const Token=localStorage.getItem('accessToken')
            const responce=await axios.get(`http://127.0.0.1:8000/api/comments/${id}/`,{
                headers:{
                        Authorization:`Bearer ${Token}`
                    }
                
            })
            setComment(responce.data)
        } catch (error) {
            console.error(error)
        }
        }
        fetchData();
    },[id])

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const Token=localStorage.getItem('accessToken')
            const responce=await axios.put(`http://127.0.0.1:8000/api/comments/${id}/`,{comment},{
                headers:{
                        Authorization:`Bearer ${Token}`
                    }
            })
            setSuccess(true)
        } catch (error) {
            console.error(error)
        }
    }

    
  return (
    <>
      <div className="container py-5">
            <div className="row">
                <h3 className='text-center'>Edit Comment</h3>
            </div>
            <div className="row">
                        <div className="col-4"></div>
                        <div className="col-4">
                            {success && <h5 className='text-success text-center my-5'>Comment edited Successfully...</h5>
                            }
                            
                            <form action="" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Comment</label>
                                <textarea className="form-control" id="comment" name='comment' value={comment.comment} onChange={(e)=>{setComment(e.target.value)}}/>
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

export default EditComment

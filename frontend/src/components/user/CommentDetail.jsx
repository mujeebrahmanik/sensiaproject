import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const CommentDetail = () => {
    const[comment,setComment]=useState('')
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
    },[])
  return (
    <>
      <div className="container py-5">
            <div className="row">
                <h3 className='text-center'>Comment Detail view</h3>
                <div className="col-2"></div>
                <div className="col-8">
                    <div className="card text-center py-3 text-capitalize">
                        <h5>{comment.comment}</h5>
                        <h6 className='text-primary'>By : {comment.user}</h6>
                    </div>
                </div>
                <div className="col-2"></div>
            </div>
            
        </div>
    </>
  )
}

export default CommentDetail

import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye,faEdit,faTrash } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../AuthProvider'


const Comments = () => {
    const {myPermission}=useContext(AuthContext)
    const[comments,setComments]=useState([])
    const [success,setSuccess]=useState(false)
    useEffect(()=>{
        const fetchData=async()=>{
            
            try {
                const Token=localStorage.getItem('accessToken')
                const responce=await axios.get('http://127.0.0.1:8000/api/comments/',
                    {
                        headers:{
                            Authorization:`Bearer ${Token}`
                        }
                    }
                )
                setComments(responce.data)
                console.log(comments)

            } catch (error) {
                console.error(error)
            }
            
        }
        fetchData();
    },[myPermission])

    const deleteComment=async(id)=>{
        try {
            const Token=localStorage.getItem('accessToken')
            const responce=await axios.delete(`http://127.0.0.1:8000/api/comments/${id}/`,{
                headers:{
                        Authorization:`Bearer ${Token}`
                    }
            })
            setComments(prev => prev.filter(comment => comment.id !== id));
            setSuccess(true)
            setTimeout(()=>{
                    setSuccess(false)
                },3000)
        } catch (error) {
            console.error(error)
            setSuccess(false)
        }
    }

  return (
    <>
        <div className="container my-3">
            <div className="row"><h4 className='text-center'>Comments</h4></div>
            <div className="row mb-2">

                {success && <h5 className='text-center text-success mb-2'>Comment Deleted</h5>}
                
                <div className=" d-flex justify-content-end">
                    {myPermission?.can_add && (
                    <Link to='/add_comment' className='btn btn-sm btn-success fw-bold'>Add Comment</Link>
                    )}
                    </div>
            </div>
            <div className="row">
                
                    <table className="table table-bordered" border={1}>
                        <thead>
                            <tr>
                            <th scope="col" className='bg-dark text-white text-center'>Sl.No</th>
                            <th scope="col" className='bg-dark text-white text-center'>Comment</th>
                            <th scope="col" className='bg-dark text-white text-center'>User</th>
                            <th scope="col" className='bg-dark text-white text-center'>Date</th>
                            <th scope="col" className='bg-dark text-white text-center'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comments.map((i,index)=>
                                <tr key={index}>
                                <th scope="row" className='text-center'>{index+1}</th>
                                <td className='text-center'>{i.comment}</td>
                                <td className='text-center'>{i.user}</td>
                                <td className='text-center'>{i.time.split("T")[0]}</td>
                                <td className='text-center'>
                                    {myPermission?.can_view && (
                                        <Link className='btn btn-sm btn-success' to={`/comment/${i.id}`}><FontAwesomeIcon icon={faEye} /></Link> 
                                    )}

                                    {myPermission?.can_edit && (
                                        <Link className='btn btn-sm btn-primary ms-1' to={`/comment/edit/${i.id}`}><FontAwesomeIcon icon={faEdit} /></Link>
                                    )} 

                                    {myPermission?.can_delete && (
                                        <button onClick={() => deleteComment(i.id)} className='btn btn-sm btn-danger ms-1'><FontAwesomeIcon icon={faTrash} /></button>

                                    )}
                                </td>
                                </tr>
                            )}
                            
                            
                        </tbody>
                        </table>
                
            </div>

        </div>
      
    </>
  )
}

export default Comments

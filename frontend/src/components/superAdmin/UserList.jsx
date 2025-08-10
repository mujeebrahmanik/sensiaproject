import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye,faEdit,faTrash } from '@fortawesome/free-solid-svg-icons'

const UserList = () => {
    const[users,setusers]=useState([])
    const [success,setSuccess]=useState(false)
    useEffect(()=>{
        const fetchData=async()=>{
            
            try {
                const Token=localStorage.getItem('accessToken')
                const responce=await axios.get('http://127.0.0.1:8000/api/users/',
                    {
                        headers:{
                            Authorization:`Bearer ${Token}`
                        }
                    }
                )
                
                setusers(responce.data)
                

            } catch (error) {
                console.error(error)
            }
            
        }
        fetchData();
    },[])

    const deleteuser=async(id)=>{
        
        try {
             const Token=localStorage.getItem('accessToken')
                const responce=await axios.delete(`http://127.0.0.1:8000/api/edit_user/${id}/`,
                    {
                        headers:{
                            Authorization:`Bearer ${Token}`
                        }
                    }
                )
                setusers(prev => prev.filter(user => user.id !== id))

                setSuccess(true)
                setTimeout(()=>{
                    setSuccess(false)
                },3000)
                

        } catch (error) {
            
        }
    }
  return (
    <>
    <div className="container py-5">
            <div className="row"><h4 className='text-center fw-bold'>Users</h4></div>
            <div className="row mb-4">

                {success && <h5 className='text-success text-center mt-3'>User Deleted Successfully..</h5>}
                
                <div className="col-12"><Link to='/admin/addusers'><button className='btn btn-success float-end fw-bold'>Add User</button></Link></div>
            </div>
            <div className="row">
                
                    <table className="table table-bordered" border={1}>
                        <thead>
                            <tr>
                            <th scope="col" className='bg-dark text-white text-center'>SL.No</th>
                            <th scope="col" className='bg-dark text-white text-center'>Username</th>
                            <th scope="col" className='bg-dark text-white text-center'>Email</th>
                            <th scope="col" className='bg-dark text-white text-center'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((i,index)=>
                                <tr key={index}>
                                <th scope="row" className='text-center'>{index+1}</th>
                                <td className='text-center'>{i.username}</td>
                                <td className='text-center'>{i.email}</td>
                                <td className='text-center'> <Link className='btn btn-sm btn-primary ms-1' to={`/admin/user/edit/${i.id}`}><FontAwesomeIcon icon={faEdit} /></Link> <button onClick={()=>deleteuser(i.id)} className='btn btn-sm btn-danger ms-1'><FontAwesomeIcon icon={faTrash} /></button></td>
                                </tr>
                            )}
                            
                            
                        </tbody>
                        </table>
                
            </div>

        </div>
      
    </>
  )
}

export default UserList

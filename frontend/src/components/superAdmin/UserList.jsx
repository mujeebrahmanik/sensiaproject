import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye,faEdit,faTrash } from '@fortawesome/free-solid-svg-icons'

const UserList = () => {
    const[users,setusers]=useState([])
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
  return (
    <>
    <div className="container my-3">
            <div className="row"><h4 className='text-center'>Users</h4></div>
            <div className="row mb-2">
                <div className="col-2"></div>
                <div className="col-2"></div>
                <div className="col-2"></div>
                 <div className="col-2"></div>
                  <div className="col-2"></div>
                <div className="col-2"><Link to='/admin/addusers' className='btn btn-sm btn-success d-flex form-control'>Add User</Link></div>
            </div>
            <div className="row">
                <div className="col-1"></div>
                <div className="col-10">
                    <table className="table table-striped" border={1}>
                        <thead>
                            <tr>
                            <th scope="col">Sl.No</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((i,index)=>
                                <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td>{i.username}</td>
                                <td>{i.email}</td>
                                <td><Link className='btn btn-sm btn-success' to={`/user/${i.id}`}><FontAwesomeIcon icon={faEye} /></Link> <Link className='btn btn-sm btn-primary ms-1' to={`/user/edit/${i.id}`}><FontAwesomeIcon icon={faEdit} /></Link> <Link className='btn btn-sm btn-danger ms-1'><FontAwesomeIcon icon={faTrash} /></Link></td>
                                </tr>
                            )}
                            
                            
                        </tbody>
                        </table>
                </div>
                <div className="col-1"></div>
            </div>

        </div>
      
    </>
  )
}

export default UserList

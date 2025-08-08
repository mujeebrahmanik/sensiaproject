import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck,faCross,faTrash,faEye,faEdit,faXmark } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


const UserPermission = () => {
    const[permission,setPermission]=useState([])
    useEffect(()=>{
        const fetchData=async()=>{
            try {
                const Token=localStorage.getItem('accessToken')
                const response=await axios.get('http://127.0.0.1:8000/api/permission/',
                    {
                        headers:{
                            Authorization:`Bearer ${Token}`
                        }
                    }
                )
                setPermission(response.data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    },[])
  return (
    <>
    <div className="container my-3">
            <div className="row"><h4 className='text-center mb-4'>User Permissions</h4></div>
            
            <div className="row">
                <div className="col-1"></div>
                <div className="col-10">
                    <table className="table table-striped" border={1}>
                        <thead>
                            <tr>
                            <th scope="col">Sl.No</th>
                            <th scope="col">User</th>
                            <th scope="col">Can View</th>
                            <th scope="col">Can Add</th>
                            <th scope="col">Can Edit</th>
                            <th scope="col">Can Delete</th>
                            <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {permission.map((i,index)=>
                                <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td>{i.user}</td>
                                <td>{i.can_view == true ? (<FontAwesomeIcon icon={faCheck} className='text-success' />):(<FontAwesomeIcon icon={faXmark}  className='text-danger' />)}</td>
                                <td>{i.can_add == true ? (<FontAwesomeIcon icon={faCheck} className='text-success' />):(<FontAwesomeIcon icon={faXmark}  className='text-danger' />)}</td>
                                <td>{i.can_edit == true ? (<FontAwesomeIcon icon={faCheck} className='text-success' />):(<FontAwesomeIcon icon={faXmark}  className='text-danger' />)}</td>
                                <td>{i.can_delete == true ? (<FontAwesomeIcon icon={faCheck} className='text-success' />):(<FontAwesomeIcon icon={faXmark}  className='text-danger' />)}</td>
                                <td> <Link className='btn btn-sm btn-primary ms-1' to={`/admin/permission/edit/${i.id}`}><FontAwesomeIcon icon={faEdit} /></Link></td>
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

export default UserPermission

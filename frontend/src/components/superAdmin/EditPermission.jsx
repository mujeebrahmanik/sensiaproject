import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';


const EditPermission = () => {
    const[success,setSuccess]=useState('')
    const [view,setView]=useState(false)
    const [add,setAdd]=useState(false)
    const [edit,setEdit]=useState(false)
    const [deletee,setDeletee]=useState(false)
    const [user,setUser]=useState('')



    const {id}=useParams()

    useEffect(()=>{
        const fetchData=async()=>{
            try {
                const Token=localStorage.getItem('accessToken')
                const response=await axios.get(`http://127.0.0.1:8000/api/edit_permission/${id}/`,
                    {
                        headers:{
                            Authorization:`Bearer ${Token}`
                        }
                }
                )
                setView(response.data.can_view)
                setAdd(response.data.can_add)
                setEdit(response.data.can_edit)
                setDeletee(response.data.can_delete)
                setUser(response.data.user)
                console.log(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    },[])

    const handleSubmit=async(e)=>{
        e.preventDefault()

        try {
            const Data={can_view:view,can_add:add,can_edit:edit,can_delete:deletee}
            const Token=localStorage.getItem('accessToken')
            const res=await axios.put(`http://127.0.0.1:8000/api/edit_permission/${id}/`,Data,
                    {
                        headers:{
                            Authorization:`Bearer ${Token}`
                        }
            }
        )

        setSuccess(true)
        } catch (error) {
            console.error(error)
        }

    }
  return (
    <>
    <div className="container py-5">
            <div className="row">
                <h3 className='text-center'>Edit Permission</h3>
            </div>
            <div className="row">
                        <div className="col-4"></div>
                        <div className="col-4">
                            {success && <h5 className='text-success text-center my-5'>Permission Changed Successfully...</h5>
                            }
                            
                            <form action="" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">User</label>
                                <input  type='text' className="form-control" id="user" name='user' value={user} readOnly />
                            </div>
                            <h5 className='text-center mb-4'>Permissions</h5>
                            <div className="row mb-3">
                                <div className="col-3">
                                <label for="exampleInputEmail1" className="form-label">View</label>
                                <input type="checkbox" checked={view} className='ms-1' onChange={(e)=>setView(e.target.checked)} />
                                </div>
                                <div className="col-3">
                                    <label for="exampleInputEmail1" className="form-label" >Add</label>
                                <input type="checkbox" checked={add} className='ms-1' onChange={(e)=>setAdd(e.target.checked)} />
                                </div>
                                <div className="col-3">
                                    <label for="exampleInputEmail1" className="form-label">Edit</label>
                                <input type="checkbox" checked={edit} className='ms-1' onChange={(e)=>setEdit(e.target.checked)}/>
                                </div>
                                <div className="col-3">
                                    <label for="exampleInputEmail1" className="form-label">Delete</label>
                                <input type="checkbox" checked={deletee} className='ms-1' onChange={(e)=>setDeletee(e.target.checked)} />
                                </div>
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

export default EditPermission

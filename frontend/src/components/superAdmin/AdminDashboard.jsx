import React from 'react'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <>

      <div className="container py-5">
            <div className="row">
                <h3 className='text-center mb-5'>Admin Dashboard</h3>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-3">
                    <div className="card text-center py-3">
                        <h5>Users</h5>
                        <Link to='/admin/users'><button className='btn btn-sm btn-success mt-3' >view</button></Link>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card text-center py-3">
                        <h5>User Permissions</h5>
                        <Link to='/admin/permission'><button className='btn btn-sm btn-success mt-3' >view</button></Link>

                    </div>
                </div>
                
            </div>
            
        </div>
    </>
  )
}

export default AdminDashboard

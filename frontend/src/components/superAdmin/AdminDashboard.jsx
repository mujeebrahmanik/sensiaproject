import React from 'react'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <>

      <div className="container py-5">
            <div className="row">
                <h3 className='text-center mb-3'>Admin Dashboard</h3>
            </div>
            <div className="row">
                <div className="col-4">
                    <div className="card text-center py-3">
                        <h3>Users</h3>
                        <Link to='/admin/users'><button className='btn btn-sm btn-success mt-3' >view</button></Link>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card text-center py-3">
                        <h3>User Permissions</h3>
                        <Link to='/admin/permission'><button className='btn btn-sm btn-success mt-3' >view</button></Link>

                    </div>
                </div>
                <div className="col-4">
                    <div className="card text-center py-3">
                        <h3>Tracking</h3>
                        <Link><button className='btn btn-sm btn-success mt-3' >view</button></Link>

                    </div>
                </div>
            </div>
            
        </div>
    </>
  )
}

export default AdminDashboard

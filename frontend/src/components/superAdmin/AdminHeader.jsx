import React from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../AuthProvider'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminHeader = () => {
    const {loggedIn,setLoggedIn}=useContext(AuthContext)
      const navigate=useNavigate()
    
      const logout=()=>{
        setLoggedIn(false)
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        navigate('/admin/login')
    }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary px-3">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">Sensia Ventures Group</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link to='/admin/dashboard' className="nav-link active" aria-current="page" href="#">Home</Link>
                </li>
             
                {loggedIn ? (
                  <li className="nav-item">
                  <button to='/' className="nav-link text-danger" aria-current="page" href="#" onClick={logout}>Logout</button>
                </li>
                ):(
                  <li className="nav-item">
                  <Link to='/admin/login' className="nav-link text-primary" aria-current="page" href="#">Login</Link>
                </li>
                )}
                
                
                
            </ul>
            
            </div>
        </div>
        </nav>
    </>
  )
}

export default AdminHeader

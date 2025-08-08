import React from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../AuthProvider'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const MainHeader = () => {
const {loggedIn,setLoggedIn}=useContext(AuthContext)
  const navigate=useNavigate()

  const logout=()=>{
    setLoggedIn(false)
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')

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
                <Link to='/' className="nav-link active" aria-current="page" href="#">Home</Link>
                </li>
                
                
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Pages
                </a>
                <ul className="dropdown-menu">
                    <li className="dropdown-item">
                    <Link to='/products' className="nav-link active" aria-current="page" href="#">Products</Link>
                    </li>
                    <li className="dropdown-item">
                    <Link to='/marketing' className="nav-link active" aria-current="page" href="#">Marketing</Link>
                    </li>
                    <li className="dropdown-item">
                    <Link to='/orders' className="nav-link active" aria-current="page" href="#">Order</Link>
                    </li>
                    <li className="dropdown-item">
                    <Link to='/media_plans' className="nav-link active" aria-current="page" href="#">Media Plans</Link>
                    </li>
                    <li className="dropdown-item">
                    <Link to='/offer' className="nav-link active" aria-current="page" href="#">Offer Pricing</Link>
                    </li>
                    <li className="dropdown-item">
                    <Link to='/clients' className="nav-link active" aria-current="page" href="#">Clients</Link>
                    </li>
                    <li className="dropdown-item">
                    <Link to='/suppliers' className="nav-link active" aria-current="page" href="#">Suppliers</Link>
                    </li>
                    <li className="dropdown-item">
                    <Link to='/customer_support' className="nav-link active" aria-current="page" href="#">Customer Support</Link>
                    </li>
                    <li className="dropdown-item">
                    <Link to='/sales_report' className="nav-link active" aria-current="page" href="#">Sales Report</Link>
                    </li>
                    <li className="dropdown-item">
                    <Link to='/finance_accounting' className="nav-link active" aria-current="page" href="#">Finance and Accounting</Link>
                    </li>

                    </ul>
                </li> 
                {loggedIn ? (
                  <li className="nav-item">
                  <button to='/' className="nav-link text-danger" aria-current="page" href="#" onClick={logout}>Logout</button>
                </li>
                ):(
                  <li className="nav-item">
                  <Link to='/login' className="nav-link text-primary" aria-current="page" href="#">Login</Link>
                </li>
                )}
                
                
                
            </ul>
            
            </div>
        </div>
        </nav>
    </>
  )
}

export default MainHeader

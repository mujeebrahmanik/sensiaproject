import React from 'react'
import { useLocation } from 'react-router-dom'
import AdminHeader from '../superAdmin/AdminHeader'
import MainHeader from './MainHeader'

const Header = () => {

  const location=useLocation();
  const AdminRoute=location.pathname.startsWith('/admin')
  return AdminRoute ? <AdminHeader/>:<MainHeader/>
}

export default Header

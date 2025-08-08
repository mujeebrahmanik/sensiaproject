import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './components/superAdmin/Login'
import Userloginpage from './components/user/Userloginpage'
import Home from './components/user/Home'
import Header from './components/user/Header'
import ProductList from './components/user/ProductList'
import MarketingList from './components/user/MarketingList'
import MediaPlans from './components/user/MediaPlans'
import Offer from './components/user/Offer'
import Clientsl from './components/user/Clientsl'
import Suppliers from './components/user/Suppliers'
import Customer from './components/user/Customer'
import SalesReport from './components/user/SalesReport'
import Finance from './components/user/Finance'
import OrderList from './components/user/OrderList'
import AddComment from './components/user/AddComment'
import AuthProvider from './AuthProvider'
import CommentDetail from './components/user/CommentDetail'
import EditComment from './components/user/EditComment'
import AdminDashboard from './components/superAdmin/AdminDashboard'
import UserList from './components/superAdmin/UserList'
import Addusers from './components/superAdmin/Addusers'
import PrivateRoute from './PrivateRoute'
import AdminRoute from './AdminRoute'
import UserPermission from './components/superAdmin/UserPermission'
import Authorized from './components/user/Authorized'
import EditPermission from './components/superAdmin/EditPermission'


function App() {
  
  return (
    <>
    
      <BrowserRouter>
      <AuthProvider>
      <Header/>
        <Routes>
          <Route path='/admin/login/' element={<Login/>} />
          <Route path='/login/' element={<Userloginpage/>} />
          <Route path='/' element={<Home/>} />
          <Route path='/products' element={<PrivateRoute  permissions={{can_view:true}}><ProductList/></PrivateRoute>} />
          <Route path='/marketing' element={<PrivateRoute permissions={{can_view:true}}><MarketingList/></PrivateRoute>} />
          <Route path='/media_plans' element={<PrivateRoute permissions={{can_view:true}}><MediaPlans/></PrivateRoute>} />
          <Route path='/offer' element={<PrivateRoute permissions={{can_view:true}}><Offer/></PrivateRoute>} />
          <Route path='/clients' element={<PrivateRoute permissions={{can_view:true}}><Clientsl/></PrivateRoute>} />
          <Route path='/suppliers' element={<PrivateRoute permissions={{can_view:true}}><Suppliers/></PrivateRoute>} />
          <Route path='/customer_support' element={<PrivateRoute permissions={{can_view:true}}><Customer/></PrivateRoute>} />
          <Route path='/sales_report' element={<PrivateRoute permissions={{can_view:true}}><SalesReport/></PrivateRoute>} />
          <Route path='/finance_accounting' element={<PrivateRoute permissions={{can_view:true}}><Finance/></PrivateRoute>} />
          <Route path='/orders' element={<PrivateRoute permissions={{can_view:true}}><OrderList/></PrivateRoute>} />
          <Route path='/add_comment' element={<PrivateRoute permissions={{can_add:true}}><AddComment/></PrivateRoute>} />
          <Route path='/comment/:id' element={<PrivateRoute permissions={{can_view:true}}><CommentDetail/></PrivateRoute>} />
          <Route path='/comment/edit/:id' element={<PrivateRoute permissions={{can_edit:true}}><EditComment/></PrivateRoute>} />
          <Route path='/admin/dashboard' element={<AdminRoute><AdminDashboard/></AdminRoute>} />
          <Route path='/admin/users' element={<AdminRoute><UserList/></AdminRoute>} />
          <Route path='/admin/addusers' element={<AdminRoute><Addusers/></AdminRoute>} />
          <Route path='/admin/permission' element={<AdminRoute><UserPermission/></AdminRoute>} />
          <Route path='/admin/permission/edit/:id' element={<AdminRoute><EditPermission/></AdminRoute>} />
          <Route path='/unauthorized' element={<PrivateRoute><Authorized/></PrivateRoute>} />






          
        </Routes>
        </AuthProvider>
      </BrowserRouter>
      </>
     
  )
}

export default App

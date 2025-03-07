import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Login from './Login'
import Register from './Register'
import PrivateRoute from '../private/PrivateRoute'
import AdminUser from '../pages/admin/AdminUser'
import Admin from '../pages/admin/Admin'
import ProfileUpdate from '../pages/admin/ProfileUpdate'
import ViewProfile from '../pages/admin/ViewProfile'
import Manager from '../pages/manager/Manager'
import User from '../pages/user/User'
import CreateBlog from '../pages/user/CreateBlog'
import UserViewProfile from '../pages/user/UserViewProfile'
import UserProfileUpdate from '../pages/user/UserProfileUpdate'
import PendingApproval from '../pages/admin/PendingApproval'
import AdminViewBlogs from '../pages/admin/AdminViewBlogs'
import Userlayout from '../private/Userlayout'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin' element={<PrivateRoute allowedRoles={['admin']} />}>
          <Route path='dashboard' element={<Admin />} />
          <Route path='users' element={<Userlayout />}>
            <Route index element={<AdminUser />} />
            <Route path='updateprofile/:id' element={<ProfileUpdate />} />
            <Route path='viewprofile/:id' element={<ViewProfile />} />
          </Route>

          <Route path='pendingapproval' element={<PendingApproval />} />


          <Route path='viewblog' element={<AdminViewBlogs />} />
        </Route>
        <Route path='/manager' element={<PrivateRoute allowedRoles={['admin']} />}>
          <Route path='dashboard' element={<Manager />} />
        </Route>
        <Route path='/user' element={<PrivateRoute allowedRoles={['user']} />}>
          <Route path='dashboard' element={<User />} />
          <Route path='createblog' element={<CreateBlog />} />
          <Route path='viewprofile/:id' element={<UserViewProfile />} />
          <Route path='updateprofile/:id' element={<UserProfileUpdate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

import React from 'react'
import Header from './Header'
import { Link, useLocation } from 'react-router-dom'

const AdminSidebar = () => {
    let location = useLocation()


    return (
        <>
            <div >
                <div className="row">
                    <div className="col-md-12">
                        <div className="list-group ">
                            <Link to={`/admin/dashboard`} className={`list-group-item ${location?.pathname == '/admin/dashboard' ? 'active' : ''}`}>Dashboard</Link>
                            <Link
                                to="/admin/users"
                                className={`list-group-item ${location?.pathname === '/admin/users' || location?.pathname.startsWith('/admin/users/viewprofile') || location?.pathname.startsWith('/admin/users/updateprofile') ? 'active' : ''}`}
                            >
                                User
                            </Link>

                            <Link to={`/admin/pendingapproval`} className={`list-group-item ${location?.pathname == '/admin/pendingapproval' ? 'active' : ''}`}>Deactive Users</Link>
                            <Link to={`/admin/viewblog`} className={`list-group-item ${location?.pathname == '/admin/viewblog' ? 'active' : ''}`}>Blogs</Link>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default AdminSidebar

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Header from '../../component/Header';
import AdminSidebar from '../../component/AdminSidebar';

const Admin = () => {
  const [auth, setAuth] = useAuth();
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [approval, setApproval] = useState(0);
  const [blog, setBlog] = useState(0);

  const fetchUserStats = async () => {
    try {
      let res = await fetch(`http://localhost:8080/admin/alluser`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth?.token?.token}`
        }
      });
      let data = await res.json();
      if (data.success) {
        setTotalUsers(data.user.length);
        setActiveUsers(data.user.filter(user => user.status === 'active').length);
        setApproval(data.user.filter(user => user.status == 'pending' || user.status == 'deactive').length);
      }

    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };
  const fetchBlogs = async () => {
    try {
      let res = await fetch(`http://localhost:8080/admin/viewblog`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth?.token?.token}`
        }
      })
      let data = await res.json();
      if (data.success) {
        console.log("Fetched Blogs:", data.blogs); 
        setBlog(data.blogs.length);

      }
      

    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };



  useEffect(() => {
    fetchUserStats();
    fetchBlogs();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <Header />
        <div className="col-md-3">
          <AdminSidebar />
        </div>
        <div className='col-md-9'>
          <div className="row gap-5 d-flex justify-content-start">
            <div className="card text-white bg-primary mb-3" style={{ width: '15rem' }}>
              <div className="card-body">
                <h5 className="card-title">Total Users</h5>
                <p className="card-text fs-4">{totalUsers}</p>
              </div>
            </div>
            <div className="card text-white bg-success mb-3" style={{ width: '15rem' }}>
              <div className="card-body">
                <h5 className="card-title">Active Users</h5>
                <p className="card-text fs-4">{activeUsers}</p>
              </div>
            </div>
            <div className="card text-white bg-warning mb-3" style={{ width: '15rem' }}>
              <div className="card-body">
                <h5 className="card-title">Pending Approvals</h5>
                <p className="card-text fs-4">{approval}</p>
              </div>
            </div>
            <div className="card text-white bg-primary mb-3" style={{ width: '15rem' }}>
              <div className="card-body">
                <h5 className="card-title">Total Blogs</h5>
                <p className="card-text fs-4">{blog}</p>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-12">
              <div className="card shadow-sm p-3">
                <h5>📊 User Growth (Coming Soon)</h5>
                <p>Graph showing user statistics over time.</p>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-12">
              <div className="card shadow-sm p-3">
                <h5>🔔 Recent Activity (Coming Soon)</h5>
                <p>Latest user and manager activities.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

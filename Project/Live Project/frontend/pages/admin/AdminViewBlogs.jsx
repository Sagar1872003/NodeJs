import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../component/Header";
import AdminSidebar from "../../component/AdminSidebar";

const AdminViewBlogs = () => {
  const [auth] = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:8080/admin/viewblog", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${auth?.token?.token}`,
          },
        });

        const data = await response.json();
        if (data.success) {
          setBlogs(data.blogs);
        } else {
          toast.error("Failed to load blogs.");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [auth]);

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3"><AdminSidebar/></div>
          <div className="col-md-9">
          <h1 className="text-center mb-4">All Blogs</h1>
        <ToastContainer position="top-center" autoClose={3000} />

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : blogs.length > 0 ? (
          <div className="row">
            {blogs.map((blog) => (
              <div className="col-md-4 mb-4" key={blog._id}>
                <div className="card shadow">
                  <img
                    src={blog.image}
                    className="card-img-top"
                    alt="Blog"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{blog.title}</h5>
                    <p className="card-text">{blog.content.substring(0, 100)}...</p>

                    {/* Show Author and Date */}
                    <p className="text-muted small">
                      <strong>By:</strong> {blog.author?.name} <br />
                      <strong>Posted on:</strong> {new Date(blog.createdAt).toLocaleString().slice(0,14)}
                      
                    </p>

                    <button className="btn btn-primary">Read More</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No blogs found.</p>
        )}
          </div>
        </div>
        
      </div>
    </>
  );
};
export default AdminViewBlogs

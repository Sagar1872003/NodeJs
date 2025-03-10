import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../component/Header";
import { useNavigate } from "react-router-dom";

const UserBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [auth] = useAuth();
    const navigate = useNavigate()

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/user/deleteblog/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth?.token?.token}`
                }
            });

            if (response.ok) {
                toast.success("Blog deleted successfully!");
                setBlogs(blogs.filter(blog => blog._id !== id));
            } else {
                toast.error("Failed to delete blog");
            }
        } catch (error) {
            console.error("Error deleting blog:", error);
            toast.error("Error deleting blog");
        }
    };

    const handleUpdate = (id) => {
        navigate(`/user/updateblog/${id}`);
    };

    useEffect(() => {
        const fetchMyBlogs = async () => {
            try {
                const response = await fetch("http://localhost:8080/user/userblogs", {
                    method: "GET",
                    headers: { "Authorization": `Bearer ${auth?.token?.token}` },
                });

                const data = await response.json();
                if (data.success) {
                    setBlogs(data.blogs);
                } else {
                    toast.error("Failed to fetch your blogs.");
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
                toast.error("Something went wrong!");
            } finally {
                setLoading(false);
            }
        };

        fetchMyBlogs();
    }, []);

    return (
        <>
            <Header />
            <div className="container mt-5">
                <h1 className="text-center mb-4">My Blogs</h1>

                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : blogs.length === 0 ? (
                    <p className="text-center">You haven't posted any blogs yet.</p>
                ) : (
                    <div className="row">
                        {blogs.map((blog) => (
                            <div key={blog._id} className="col-md-4 mb-4">
                                <div className="card shadow">
                                    <img src={blog.image} alt={blog.title} className="card-img-top" style={{ height: 200, objectFit: "cover" }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{blog.title}</h5>
                                        <p className="card-text">{blog.content.substring(0, 100)}...</p>
                                        <p className="text-muted">
                                            <strong>Posted on:</strong> {new Intl.DateTimeFormat('en-US', {
                                                year: 'numeric', month: 'short', day: 'numeric',
                                                hour: '2-digit', minute: '2-digit', hour12: true
                                            }).format(new Date(blog.createdAt))}
                                        </p>
                                        <div className="d-flex justify-content-between">
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(blog._id)}
                                            >
                                                Delete
                                            </button>
                                            <button
                                                className="btn btn-warning"
                                                onClick={() => handleUpdate(blog._id)}
                                            >
                                                Update
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <ToastContainer position="top-right" autoClose={3000} />
            </div>
        </>
    );
};

export default UserBlogs;

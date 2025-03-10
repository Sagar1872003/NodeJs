import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../component/Header";
import AdminSidebar from "../../component/AdminSidebar";
import { useNavigate } from "react-router-dom";

const AdminViewBlogs = () => {
  const [auth, setAuth] = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState({});
  const [loadingComments, setLoadingComments] = useState({});
  const [showComments, setShowComments] = useState({});
  const navigate = useNavigate();

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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/admin/deleteblog/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.token?.token}`,
        },
      });

      if (response.ok) {
        toast.success("Blog deleted successfully!");
        setBlogs(blogs.filter((blog) => blog._id !== id));
      } else {
        toast.error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Error deleting blog");
    }
  };

  const handleUpdate = (id) => {
    navigate(`/admin/updateblog/${id}`);
  };

  const fetchComments = async (blogId) => {
    try {
      setLoadingComments((prev) => ({ ...prev, [blogId]: true }));

      const response = await fetch(`http://localhost:8080/admin/comments/${blogId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth?.token?.token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setComments((prev) => ({ ...prev, [blogId]: data.comments }));
      } else {
        toast.error("Failed to load comments.");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoadingComments((prev) => ({ ...prev, [blogId]: false }));
    }
  };

  const toggleComments = (blogId) => {
    if (showComments[blogId]) {
      setShowComments((prev) => ({ ...prev, [blogId]: false }));
    } else {
      fetchComments(blogId);
      setShowComments((prev) => ({ ...prev, [blogId]: true }));
    }
  };

  const handleDeleteComment = async (commentId, blogId) => {
    try {
      const response = await fetch(`http://localhost:8080/admin/deletecomment/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.token?.token}`,
        },
      });

      if (response.ok) {
        toast.success("Comment deleted successfully!");
        setComments((prev) => ({
          ...prev,
          [blogId]: prev[blogId].filter((comment) => comment._id !== commentId),
        }));
      } else {
        toast.error("Failed to delete comment.");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Error deleting comment.");
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3">
            <AdminSidebar />
          </div>
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

                        <p className="text-muted small">
                          <strong>By:</strong> {blog.author?.name} <br />
                          <strong>Posted on:</strong>{" "}
                          {new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }).format(new Date(blog.createdAt))}
                        </p>

                        <div className="d-flex justify-content-between">
                          <button className="btn btn-danger" onClick={() => handleDelete(blog._id)}>
                            Delete
                          </button>
                          <button className="btn btn-warning" onClick={() => handleUpdate(blog._id)}>
                            Update
                          </button>
                          <button className="btn btn-secondary" onClick={() => toggleComments(blog._id)}>
                            {showComments[blog._id] ? "Hide Comments" : "View Comments"}
                          </button>
                        </div>

                        {/* Display Comments */}
                        {showComments[blog._id] && (
                          <div className="mt-3 p-2 border rounded bg-light">
                            {loadingComments[blog._id] ? (
                              <p>Loading comments...</p>
                            ) : comments[blog._id]?.length > 0 ? (
                              comments[blog._id].map((comment) => (
                                <div key={comment._id} className="p-2 border-bottom d-flex justify-content-between">
                                  <div>
                                    <strong>{comment.userId?.name}</strong>: {comment.comment}
                                    <p className="text-muted small">{new Date(comment.createdAt).toLocaleString()}</p>
                                  </div>
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDeleteComment(comment._id, blog._id)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              ))
                            ) : (
                              <p>No comments yet.</p>
                            )}
                          </div>
                        )}
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

export default AdminViewBlogs;

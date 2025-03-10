import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../component/Header";

const User = () => {
  const [auth] = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCommentBox, setShowCommentBox] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState({});
  const [loadingComments, setLoadingComments] = useState({});

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:8080/user/viewblog", {
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

  const toggleCommentBox = (blogId) => {
    setShowCommentBox(showCommentBox === blogId ? null : blogId);
  };

  const handleCommentSubmit = async (blogId) => {
    if (!commentText.trim()) {
      toast.error("Comment cannot be empty!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/user/addcomment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.token?.token}`,
        },
        body: JSON.stringify({ blogId, userId: auth?.token?.user?._id, comment: commentText }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Comment added successfully!");
        setCommentText("");
        setShowCommentBox(null);
        fetchComments(blogId); // Refresh comments after adding
      } else {
        toast.error("Failed to add comment.");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Something went wrong!");
    }
  };

  const fetchComments = async (blogId) => {
    try {
      setLoadingComments((prev) => ({ ...prev, [blogId]: true }));

      const response = await fetch(`http://localhost:8080/user/comments/${blogId}`, {
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
    if (comments[blogId]) {
      setComments((prev) => ({ ...prev, [blogId]: null }));
    } else {
      fetchComments(blogId);
    }
  };

  const handleDeleteComment = async (id, blogId) => {
    try {
      const response = await fetch(`http://localhost:8080/user/deletecomment/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth?.token?.token}`,
        },
      });

      if (response.ok) {
        toast.success("Comment deleted successfully!");
        fetchComments(blogId);
      } else {
        toast.error("Failed to delete comment.");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
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

                    {/* Comment & View Comments Buttons */}
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => toggleCommentBox(blog._id)}
                      >
                        {showCommentBox === blog._id ? "Cancel" : "Comment"}
                      </button>

                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => toggleComments(blog._id)}
                      >
                        {comments[blog._id] ? "Hide Comments" : "View Comments"}
                      </button>
                    </div>

                    {/* Comment Input Box */}
                    {showCommentBox === blog._id && (
                      <div className="mt-3">
                        <textarea
                          className="form-control"
                          rows="2"
                          placeholder="Write your comment..."
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                        ></textarea>
                        <button
                          className="btn btn-success btn-sm mt-2"
                          onClick={() => handleCommentSubmit(blog._id)}
                        >
                          Submit
                        </button>
                      </div>
                    )}

                    {/* Display Comments */}
                    {comments[blog._id] && (
                      <div className="mt-3 p-2 border rounded bg-light">
                        {loadingComments[blog._id] ? (
                          <p>Loading comments...</p>
                        ) : comments[blog._id].length > 0 ? (
                          comments[blog._id].map((comment) => (
                            <div key={comment._id} className="p-2 border-bottom">
                              <strong>{comment.userId.name}</strong>: {comment.comment}
                              <p className="text-muted small">{new Date(comment.createdAt).toLocaleString()}</p>

                              {/* Show delete button only for logged-in user's comments */}
                              {comment.userId._id === auth?.token?.user?._id && (
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => handleDeleteComment(comment._id, blog._id)}
                                >
                                  Delete
                                </button>
                              )}
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
    </>
  );
};

export default User;

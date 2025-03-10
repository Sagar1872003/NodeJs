import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../component/Header";

const UserUpdateBlog = () => {
    const { id } = useParams();
    const [auth] = useAuth();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`http://localhost:8080/user/getblog/${id}`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${auth?.token?.token}` },
                });

                const data = await response.json();
                if (data.success) {
                    setTitle(data.blogs.title);
                    setContent(data.blogs.content);
                    setPreview(data.blogs.image);
                } else {
                    toast.error("Failed to fetch blog details.");
                }
            } catch (error) {
                console.error("Error fetching blog:", error);
                toast.error("Something went wrong!");
            }
        };

        fetchBlog();
    }, [id, auth]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file)); 
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (image) formData.append("image", image);

        try {
            const response = await fetch(`http://localhost:8080/user/updateblog/${id}`, {
                method: "PUT",
                headers: { "Authorization": `Bearer ${auth?.token?.token}` }, 
                body: formData,
            });

            const data = await response.json();
            if (data.success) {
                toast.success("Blog updated successfully!");
                setTimeout(() => navigate("/admin/viewblog"), 2000);
            } else {
                toast.error(data.message || "Failed to update blog.");
            }
        } catch (error) {
            console.error("Error updating blog:", error);
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <div className="container mt-5">
                <h1 className="text-center mb-4">Update Blog</h1>
                <div className="card shadow p-4" style={{ width: 400 }}>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-3">
                            <input
                                type="text"
                                placeholder="Title"
                                className="form-control"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <textarea
                                placeholder="Content"
                                className="form-control"
                                rows="4"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <input type="file" id="fileInput" className="form-control" onChange={handleImageChange} />
                        </div>
                        {preview && <img src={preview} alt="Blog" className="img-fluid mb-3" style={{ height: 200 }} />}
                        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                            {loading ? "Updating..." : "Update Blog"}
                        </button>
                    </form>
                </div>
                <ToastContainer position="top-center" autoClose={3000} />
            </div>
        </>
    );
};

export default UserUpdateBlog;

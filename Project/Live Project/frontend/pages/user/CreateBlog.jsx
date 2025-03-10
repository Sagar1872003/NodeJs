import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../component/Header";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
    const [auth, setAuth] = useAuth();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate(); // ✅ Corrected navigation function

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            toast.warn("Please select an image!");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("image", image);

        try {
            const response = await fetch("http://localhost:8080/user/viewblog", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${auth?.token?.token}`,
                },
                body: formData,
            });

            const data = await response.json();
            console.log("Blog Created:", data);

            if (response.ok) { // ✅ Check HTTP response status instead of `data.success`
                toast.success("Blog posted successfully!");

                // Clear form
                setTitle("");
                setContent("");
                setImage(null);
                document.getElementById("fileInput").value = ""; // Clear file input

                // ✅ Use `navigate` instead of `Navigate`
                setTimeout(() => {
                    navigate("/user/dashboard");
                }, 2000); // Delay for toast to show before navigating
            } else {
                toast.error(data.message || "Failed to post blog.");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Something went wrong!");
        }
    };

    return (
        <>
            <Header />
            <div className="container mt-5">
                <h1 className="text-center mb-4">Create a Blog</h1>
                <div className="card shadow p-4" style={{ width: 400 }}>
                    <form onSubmit={handleSubmit}>
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
                            <input
                                type="file"
                                id="fileInput"
                                className="form-control"
                                onChange={handleImageChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Submit
                        </button>
                    </form>
                </div>
                <ToastContainer position="top-right" autoClose={3000} />
            </div>
        </>
    );
};

export default CreateBlog;

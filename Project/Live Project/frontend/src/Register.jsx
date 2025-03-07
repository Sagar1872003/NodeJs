import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./Login.css";

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [city, setCity] = useState("");
    const [contact, setContact] = useState("");
    const [image, setImage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("password", password);
        formData.append("email", email);
        formData.append("gender", gender);
        formData.append("city", city);
        formData.append("contact", contact);
        formData.append("image", image);

        try {
            if (!name || !email || !password || !contact || !city || !gender || !image) {
                toast.error("All fields are required");
                return;
            }

            let res = await fetch(`http://localhost:8080/register`, {
                method: "POST",
                body: formData,
            });

            let user = await res.json();
            if (user.success) {
                toast.success(user.message);
                setName("");
                setEmail("");
                setPassword("");
                setContact("");
                setCity("");
                setGender("");
                setImage(null);
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else {
                toast.error(user.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-boxr">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <h4 className="text-center">Register</h4>
                    <div className="form-row">
                        <div className="form-column">
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" className="form-control" placeholder="Enter name"
                                    onChange={(e) => setName(e.target.value)} value={name} />
                            </div>
                            <div className="form-group">
                                <label>Email address</label>
                                <input type="email" className="form-control" placeholder="Enter email"
                                    onChange={(e) => setEmail(e.target.value)} value={email} />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Enter password"
                                    onChange={(e) => setPassword(e.target.value)} value={password} />
                            </div>
                        </div>
                        <div className="form-column">
                            <div className="form-group">
                                <label>Gender</label>
                                <br />
                                <input type="radio" name="gender" value="male" onChange={(e) => setGender(e.target.value)} /> Male &nbsp;
                                <input type="radio" name="gender" value="female" onChange={(e) => setGender(e.target.value)} /> Female
                            </div>
                            <div className="form-group">
                                <label>Contact</label>
                                <input type="number" className="form-control" placeholder="Enter contact"
                                    onChange={(e) => setContact(e.target.value)} value={contact} />
                            </div>
                            <div className="form-group">
                                <label>City</label>
                                <input type="text" className="form-control" placeholder="Enter city"
                                    onChange={(e) => setCity(e.target.value)} value={city} />
                            </div>
                            <div className="form-group">
                                <label>Image</label>
                                <input type="file" className="form-control"
                                    onChange={(e) => setImage(e.target.files[0])} />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-orange btn-block">Register</button>
                    <div className="text-center mt-3">
                        <p>Already have an account?</p>
                        <Link to="/" className="auth-link">Login here</Link>
                    </div>
                </form>
            </div>
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    );
};

export default Register;

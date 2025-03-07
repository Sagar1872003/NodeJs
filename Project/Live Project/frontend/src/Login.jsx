import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const userRole = auth?.token?.user?.role;
        if (userRole === "admin") {
            navigate("/admin/dashboard");
        } else if (userRole === "manager") {
            navigate("/manager/dashboard");
        } else if (userRole === "user") {
            navigate("/user/dashboard");
        }
    }, [auth?.token])

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (!email || !password) {
                toast.error("All fields are required");
                return;
            }
    
            let res = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({ email: email, password: password }),
            });
    
            let data = await res.json();
    
            if (data.success) {
                let login = {
                    token: data?.token,
                    user: data?.user
                }
                toast.success(data.message);
                localStorage.setItem("userdata", JSON.stringify(login));
                setAuth({ ...auth, token: login });
    
                let userrole = data?.user?.role;
    
    
    
    
                setTimeout(() => {
                    if (userrole === "admin") {
                        navigate("/admin/dashboard");
                    } else if (userrole === "manager") {
                        navigate("/manager/dashboard");
                    } else {
                        navigate("/user/dashboard");
                    }
                }, 1000);
            } else {
                toast.error(data.message);
                setEmail("")
                setPassword("")
                return false;
            }
        } catch (error) {
            console.log(error)
            return false;
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <h4>Login</h4>
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
                    <button type="submit" className="btn btn-orange btn-block">Login</button>
                    <div className="text-center mt-3">
                        <p>New User?</p>
                        <Link to="/register" className="auth-link">Create Account</Link>
                    </div>
                </form>
            </div>
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    );
};

export default Login;

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!email || !password) {
                toast.error('All fields are required');
                return;
            }

            let res = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            let user = await res.json();
            if (user.success) {
                toast.success(user.message);

                // Store token properly
                localStorage.setItem('token', JSON.stringify({ token: user.token }));

                // Update Auth Context
                setAuth({ token: user.token });

                // Redirect after 2 seconds
                setTimeout(() => {
                    navigate('/admin/dashboard');
                }, 2000);
            } else {
                toast.error(user.message);
            }
        } catch (error) {
            console.error("Login Error:", error);
            toast.error("Something went wrong");
        }
    };

    return (
        <>
            <div className='container'>
                <div className="my-auto d-flex justify-content-center align-items-center p-3" style={{ height: '80vh' }}>
                    <form className="border p-4 rounded shadow" style={{ width: '100%', maxWidth: '400px' }} onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                placeholder="Enter email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block mt-3">
                            Submit
                        </button>
                        <div className="text-center mt-3">
                            <p className="mb-0">If you are a new user,</p>
                            <Link to={'/register'} className="btn btn-link p-0">
                                Register here
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={2000} />
        </>
    );
};

export default Login;

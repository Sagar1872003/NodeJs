import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../../component/Header';
import AdminSidebar from '../../component/AdminSidebar';

const ViewProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [auth] = useAuth();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                let res = await fetch(`http://localhost:8080/admin/user/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${auth?.token?.token}`
                    }
                });
                let data = await res.json();
                if (data.success) {
                    setUser(data.user);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    }, [id, auth]);

    return (
        <div className="container">
            <Header />
            <div className="row">
                <div className="col-md-3">
                    <AdminSidebar />
                </div>
                <div className="col-md-9">
                    {user ? (
                        <div className="card p-4 shadow">
                            <div className="text-center">
                                <img src={user.image} className="rounded-circle" alt={user.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                                <h4 className="mt-3">{user.name}</h4>
                                <p className="text-muted">Role : {user.role} || Email : {user.email}</p>
                            </div>
                            <div className="mt-3">
                                <p><strong>City:</strong> {user.city}</p>
                                <p><strong>Contact:</strong> {user.contact}</p>
                                <p><strong>Status:</strong> {user.status}</p>
                            </div>
                            <div className="mt-4 text-center">
                                <button className="btn btn-primary" onClick={() => navigate(`/admin/users/updateprofile/${user._id}`)}>Update Profile</button>
                            </div>
                        </div>
                    ) : <p>Loading user data...</p>}
                </div>
            </div>
        </div>
    );
};

export default ViewProfile;

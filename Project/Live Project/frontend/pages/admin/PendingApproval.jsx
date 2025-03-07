import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'  
import AdminSidebar from '../../component/AdminSidebar'
import Header from '../../component/Header'
import { useAuth } from '../../context/AuthContext'

const PendingApproval = () => {
    const [auth, setAuth] = useAuth()
    const [users, setUsers] = useState([])
    const navigate = useNavigate(); 

    const fetchUser = async () => {
        try {
            let res = await fetch(`http://localhost:8080/admin/pendingapproval`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth?.token?.token}`
                }
            })
            let data = await res.json()
            if (data.success) {
                setUsers(data.user)
            }
        } catch (error) {
            console.log(error);
            return false
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const changeStatus = async (id) => {
        try {
            let res = await fetch(`http://localhost:8080/admin/changestatus/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth?.token?.token}`
                }
            });

            let data = await res.json();
            console.log("Response from server:", data);

            if (data.success) {
                setUsers(users.map(user =>
                    user._id === id ? { ...user, status: user.status === 'active' ? 'deactive' : 'active' } : user
                ));
            } else {
                console.error("Error updating status:", data.message);
            }
        } catch (error) {
            console.log(error);
            return false
        }
    };

    const deleteUser = async (id) => {
        try {
            let res = await fetch(`http://localhost:8080/admin/deleteuser/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth?.token?.token}`
                }
            })
            let data = await res.json()
            console.log(data)
            if (data.success) {
                setUsers(users.filter(user => user._id !== id))
            }
            else {
                console.error("Error deleting user:", data.message);
            }
        } catch (error) {
            console.log(error);
            return false
        }
    }

    return (
        <div className="container">
            <Header />
            <div className="row">
                <div className="col-md-3">
                    <AdminSidebar />
                </div>
                <div className="col-md-9 d-flex flex-wrap gap-5 justify-content-start">
                    {users.map((val, index) => (
                        <div key={index} className="card shadow p-3 mb-4 bg-white rounded text-center" style={{ width: '18rem' }}>
                            <img src={val.image} className="card-img-top rounded-circle mx-auto d-block" alt={val.name} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                            <div className="card-body">
                                <h5 className="card-title">{val.name}</h5>
                                <p className="card-text text-muted">@{val.role} | {val.email}</p>
                                <div className="d-flex justify-content-center gap-2 mb-3">
                                    <button
                                        className={`btn ${val.status === 'active' ? 'btn-success' : 'btn-warning'}`}
                                        onClick={() => changeStatus(val._id)}
                                    >
                                        {val.status === 'active' ? "Activate" : "Deactivate"}
                                    </button>
                                    <button className="btn btn-danger" onClick={() => deleteUser(val._id)}>Remove</button>
                                </div>
                                <button
                                    className="btn btn-primary w-100"
                                    onClick={() => navigate(`/admin/viewprofile/${val._id}`)}
                                >
                                    View Profile
                                </button>
                                <div className="mt-3">
                                    <p className="mb-1"><strong>City:</strong> {val.city}</p>
                                    <p className="mb-1"><strong>Contact:</strong> {val.contact}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PendingApproval

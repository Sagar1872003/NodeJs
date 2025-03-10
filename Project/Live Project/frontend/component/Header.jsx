import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const location = useLocation();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  
  const logoutuser = () => {
    setAuth({
      ...auth,
      token: null,
    });
    localStorage.removeItem('userdata');
    toast.success('User Logout Successfully');

    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <>

      <div className="container ">
        <nav className="navbar navbar-expand-lg navbar-dark px-4">
          <Link className="navbar-brand fw-bold text-dark" to="/">
            MyBlog
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              {!auth?.token && location.pathname !== "/admin" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-white fw-bold" to="/">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white fw-bold" to="/register">Register</Link>
                  </li>
                </>
              )}

              {auth?.token && location.pathname === "/user/dashboard" && (
                <li className="nav-item">
                  <Link className="btn btn-success btn-sm fw-bold mx-2" to="/user/createblog">
                    + Add Blog
                  </Link>
                </li>
              )}
              {auth?.token && location.pathname === "/user/dashboard" && (
                <li className="nav-item">
                  <button className="btn btn-success btn-sm fw-bold mx-2" onClick={() => navigate(`/user/userblogs/${auth?.token?.user?._id}`)}>
                    View Your Blogs
                  </button>
                  
                </li>
              )}
              {auth?.token && location.pathname === "/user/dashboard" && (
                <li className="nav-item">
                  <button
                    className="btn text-white btn-warning btn-sm fw-bold mx-2"
                    onClick={() => navigate(`/user/viewprofile/${auth?.token?.user?._id}`)}
                  >
                    View Profile
                  </button>
                </li>
              )}


              {auth?.token && (
                <li className="nav-item">
                  <button className="btn btn-danger btn-sm fw-bold" onClick={logoutuser}>
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
};

export default Header;

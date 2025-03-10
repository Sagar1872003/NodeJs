import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";
import Header from "../../component/Header";
import AdminSidebar from "../../component/AdminSidebar";

const ProfileUpdate = () => {
  const [auth] = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  // Separate state variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [contact, setContact] = useState("");
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:8080/admin/profileupdate/${id}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${auth?.token?.token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        if (data.success) {
          setName(data.user.name);
          setEmail(data.user.email);
          setGender(data.user.gender);
          setCity(data.user.city);
          setContact(data.user.contact);
          setCurrentImage(data.user.image);
        } else {
          toast.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchProfile();
  }, [id]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = new FormData();
    updateData.append("name", name);
    updateData.append("email", email);
    updateData.append("gender", gender);
    updateData.append("city", city);
    updateData.append("contact", contact);
    if (image) updateData.append("image", image);

    try {
      const res = await fetch(`http://localhost:8080/admin/profileupdate/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${auth?.token?.token}`,
        },
        body: updateData,
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Profile updated successfully");
        setTimeout(() => navigate("/admin/users"), 2000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      
      toast.error("Failed to update profile");
    }
  };

  return (
    <>
    <Header/>

    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <AdminSidebar/>
        </div>
        <div className="col-md-9">
        <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">Profile</h2>

        {currentImage && (
          <div className="text-center mb-3">
            <img
              src={currentImage}
              alt="Current Profile"
              className="rounded-circle"
              width="150"
              height="150"
            />
            <p className="text-muted mt-2">Current Profile Image</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" disabled className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Gender</label>
            <select className="form-select" value={gender} onChange={(e) => setGender(e.target.value)} required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">City</label>
            <input type="text" className="form-control" value={city} onChange={(e) => setCity(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Contact</label>
            <input type="text" className="form-control" value={contact} onChange={(e) => setContact(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Profile Image</label>
            <input type="file" className="form-control" onChange={handleFileChange} />
          </div>

          <button type="submit" className="btn btn-primary w-100">Update Profile</button>
        </form>
      </div>
        </div>
      </div>
  
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
    </>
  );
};

export default ProfileUpdate;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({ name: '', email: '', contact: '' });
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    if (user) {
      setProfile({ name: user.name, email: user.email, contact: user.contact || '' });
      fetchUploads();
    }
  }, [user]);

  const fetchUploads = async () => {
    try {
      const res = await axios.get('http://localhost:5050/api/user/uploads', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUploads(res.data);
    } catch (err) {
      console.error('Failed to fetch uploads:', err);
    }
  };

  return (
    <div className="container py-5" style={{ backgroundColor: 'rgb(30, 30, 30)', minHeight: '100vh', color: 'white' }}>
      <div className="text-center mb-5">
        <h2 className="display-5 fw-bold">Your Profile</h2>
        <p className="text-secondary">Manage your personal information and uploaded items</p>
      </div>

      <div className="row mb-5">
        <div className="col-md-6 offset-md-3">
          <div className="card bg-dark text-white border-secondary">
            <div className="card-body">
              <h4 className="card-title mb-4">Profile Information</h4>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control bg-secondary text-white" value={profile.name} readOnly />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control bg-secondary text-white" value={profile.email} readOnly />
              </div>
              <div className="mb-3">
                <label className="form-label">Contact</label>
                <input type="text" className="form-control bg-secondary text-white" value={profile.contact} readOnly />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <h4 className="mb-4 text-center">Your Uploaded Items</h4>
        {uploads.length === 0 ? (
          <p className="text-center text-muted">No uploads yet.</p>
        ) : (
          uploads.map((item) => (
            <div className="col-md-6 col-lg-4 mb-4" key={item._id}>
              <div className="card bg-secondary text-white h-100">
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text"><small>📍 {item.location}</small></p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
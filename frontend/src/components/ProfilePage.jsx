import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({ name: '', email: '', contact: '', connections: 155 });
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name,
        email: user.email,
        contact: user.contact || '',
        connections: 155, // Static for now
      });
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
    <div className="container-fluid py-4" style={{ backgroundColor: '#1e1e1e', color: 'white', minHeight: '100vh' }}>
      {/* Cover + Profile */}
      <div className="position-relative mb-5">
        <div className="bg-secondary rounded" style={{ height: '200px' }}></div>
        <div className="position-absolute top-100 start-0 translate-middle-y ps-4 d-flex align-items-end gap-3">
          <div
            className="rounded-circle border border-4 border-dark"
            style={{ width: '100px', height: '100px', backgroundColor: '#aaa' }}
          ></div>
          <div>
            <h4 className="m-0">{profile.name}</h4>
            <small className="text-muted">{profile.connections} connections</small>
          </div>
        </div>
        <div className="position-absolute top-100 end-0 translate-middle-y pe-4 d-flex gap-2">
          <button className="btn btn-outline-light">Connect</button>
          <button className="btn btn-outline-light">Chat</button>
        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4 border-secondary">
        <li className="nav-item">
          <a className="nav-link active bg-dark text-white" href="#">Recent</a>
        </li>
        <li className="nav-item"><a className="nav-link text-light" href="#">Profile Info</a></li>
        <li className="nav-item"><a className="nav-link text-light" href="#">Uploaded</a></li>
        <li className="nav-item"><a className="nav-link text-light" href="#">Video</a></li>
        <li className="nav-item"><a className="nav-link text-light" href="#">Following</a></li>
      </ul>

      {/* User Content Section */}
      <div className="row">
        {/* Left Panel: User Details + Photos */}
        <div className="col-md-4 mb-4">
          {/* User Details */}
          <div className="card bg-dark text-white mb-4">
            <div className="card-body">
              <h5 className="card-title">User Details</h5>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Contact:</strong> {profile.contact}</p>
              <button className="btn btn-outline-light btn-sm me-2">Save Bio</button>
              <button className="btn btn-outline-light btn-sm me-2">Update Info</button>
              <button className="btn btn-outline-light btn-sm">Add Interests</button>
            </div>
          </div>

          {/* Recent Photos */}
          <div className="card bg-dark text-white mb-3">
            <div className="card-body">
              <h5 className="card-title">Recent Photos</h5>
              <div className="row g-2">
                {[...Array(4)].map((_, i) => (
                  <div className="col-6" key={i}>
                    <div className="bg-secondary rounded" style={{ height: '80px' }}></div>
                  </div>
                ))}
              </div>
              <button className="btn btn-outline-light btn-sm mt-3 w-100">Show More</button>
            </div>
          </div>
        </div>

        {/* Right Panel: Posts */}
        <div className="col-md-8">
          {/* Share Box */}
          <div className="card bg-dark text-white mb-4">
            <div className="card-body">
              <input type="text" className="form-control bg-secondary text-white" placeholder="Share your story here" />
            </div>
          </div>

          {/* Posts */}
          <div className="row g-4">
            {uploads.length === 0 ? (
              <p className="text-secondary text-center">No recent posts yet.</p>
            ) : (
              uploads.slice(0, 3).map((item) => (
                <div className="col-md-6 col-lg-4" key={item._id}>
                  <div className="card bg-secondary text-white h-100">
                    <div className="card-body">
                      <h6 className="card-title">{item.title}</h6>
                      <p className="card-text">{item.description}</p>
                      <p className="card-text"><small>📍 {item.location}</small></p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Load More */}
          {uploads.length > 3 && (
            <div className="text-center mt-4">
              <button className="btn btn-outline-light">Load More</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
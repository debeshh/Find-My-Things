import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddLostItem = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    dateLost: '',
    contactInfo: '',
    image: null,
  });

  const [uploading, setUploading] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('location', formData.location);
    data.append('dateLost', formData.dateLost);
    data.append('contactInfo', formData.contactInfo);
    data.append('type', 'lost');
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      setUploading(true);
      const res = await axios.post('http://localhost:5050/api/lost', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Lost item reported successfully');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Failed to report lost item');
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="text-center mt-5">Checking login status...</div>;

  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Report Lost Item</h2>
      <form onSubmit={handleSubmit} className="bg-dark text-light p-4 rounded shadow">
  <div className="mb-3">
    <label className="form-label fw-semibold">Title</label>
    <input
      type="text"
      className="form-control bg-dark text-light border-secondary"
      name="title"
      value={formData.title}
      onChange={handleChange}
      required
    />
  </div>
  <div className="mb-3">
    <label className="form-label fw-semibold">Description</label>
    <textarea
      className="form-control bg-dark text-light border-secondary"
      name="description"
      value={formData.description}
      onChange={handleChange}
      rows="3"
      required
    />
  </div>
  <div className="mb-3">
    <label className="form-label fw-semibold">Category</label>
    <input
      type="text"
      className="form-control bg-dark text-light border-secondary"
      name="category"
      value={formData.category}
      onChange={handleChange}
      required
    />
  </div>
  <div className="mb-3">
    <label className="form-label fw-semibold">Location</label>
    <input
      type="text"
      className="form-control bg-dark text-light border-secondary"
      name="location"
      value={formData.location}
      onChange={handleChange}
      required
    />
  </div>
  <div className="mb-3">
    <label className="form-label fw-semibold">Date Lost</label>
    <input
      type="date"
      className="form-control bg-dark text-light border-secondary"
      name="dateLost"
      value={formData.dateLost}
      onChange={handleChange}
      required
    />
  </div>
  <div className="mb-3">
    <label className="form-label fw-semibold">Contact Info</label>
    <input
      type="text"
      className="form-control bg-dark text-light border-secondary"
      name="contactInfo"
      value={formData.contactInfo}
      onChange={handleChange}
      required
    />
  </div>
  <div className="mb-4">
    <label className="form-label fw-semibold">Image (optional)</label>
    <input
      type="file"
      className="form-control bg-dark text-light border-secondary"
      onChange={handleFileChange}
    />
  </div>
  <button type="submit" className="btn btn-outline-light fw-bold w-100" disabled={uploading}>
    {uploading ? 'Submitting...' : 'Submit'}
  </button>
</form>
    </div>
  );
};

export default AddLostItem;
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    dateLost: '',
    contactInfo: '',
    image: '',
  });
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`https://find-my-things.onrender.com/api/lost/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProduct(data);
        setPreview(data.image);
      } catch (error) {
        console.error('Failed to fetch product:', error.message);
        navigate('/');
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in product) {
        formData.append(key, product[key]);
      }
      if (imageFile) {
        formData.append('image', imageFile);
      }

      await axios.put(`http://localhost:5050/api/lost/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate(`/lost/${id}`);
    } catch (error) {
      console.error('Failed to update product:', error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="p-5 rounded shadow"
        style={{
          backgroundColor: '#1e1e1e',
          color: '#f8f9fa',
          maxWidth: '720px',
          margin: '0 auto',
          border: '1px solid #343a40',
        }}
      >
        <h2 className="text-center mb-4" style={{ color: '#0dcaf0' }}>
          Update Lost Item Details
        </h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
              className="form-control bg-dark text-light border-secondary"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              rows="3"
              className="form-control bg-dark text-light border-secondary"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              className="form-control bg-dark text-light border-secondary"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Location</label>
            <input
              type="text"
              name="location"
              value={product.location}
              onChange={handleChange}
              className="form-control bg-dark text-light border-secondary"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Date Lost</label>
            <input
              type="date"
              name="dateLost"
              value={product.dateLost?.split('T')[0] || ''}
              onChange={handleChange}
              className="form-control bg-dark text-light border-secondary"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contact Info</label>
            <input
              type="text"
              name="contactInfo"
              value={product.contactInfo}
              onChange={handleChange}
              className="form-control bg-dark text-light border-secondary"
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Upload New Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="form-control bg-dark text-light border-secondary"
            />
            {preview && (
              <div className="mt-3 text-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="img-fluid rounded"
                  style={{ maxHeight: '200px', objectFit: 'contain' }}
                />
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-info w-100 fw-bold">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProductPage;
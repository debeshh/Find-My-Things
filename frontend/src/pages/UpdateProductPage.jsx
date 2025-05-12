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
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5050/api/lost/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProduct(data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5050/api/lost/${id}`, product, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      navigate(`/lost/${id}`);
    } catch (error) {
      console.error('Failed to update product:', error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="p-4 border rounded bg-light shadow-sm">
        <h2 className="mb-4 text-center text-primary">Update Lost Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={product.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={product.description}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Category</label>
            <input
              type="text"
              className="form-control"
              name="category"
              value={product.category}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Location</label>
            <input
              type="text"
              className="form-control"
              name="location"
              value={product.location}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Date Lost</label>
            <input
              type="date"
              className="form-control"
              name="dateLost"
              value={product.dateLost?.split('T')[0] || ''}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Contact Info</label>
            <input
              type="text"
              className="form-control"
              name="contactInfo"
              value={product.contactInfo}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-success w-100 fw-bold">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProductPage;
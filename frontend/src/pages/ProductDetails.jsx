import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      parsedUser._id = parsedUser._id || parsedUser.id; // Normalize to _id
      setUser(parsedUser);
      console.log('🔍 Logged-in user:', parsedUser);
    }

    // Fetch the product details
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5050/api/lost/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProduct(res.data);
        console.log('🧾 Product data:', res.data);
        console.log('📌 product.user (raw):', res.data.user);
      } catch (err) {
        console.error('Error fetching product:', err.message);
        navigate('/login');
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5050/api/lost/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      navigate('/');
    } catch (err) {
      console.error('Error deleting product:', err.message);
    }
  };

  const handleMarkAsFound = async () => {
    try {
      await axios.patch(`http://localhost:5050/api/lost/${id}/found`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setProduct({ ...product, isFound: true });
    } catch (err) {
      console.error('Error marking as found:', err.message);
    }
  };

  const isOwner = user?._id === product?.user?._id || user?._id === product?.user;
  console.log('✅ Is owner:', isOwner);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mt-5 mb-5">
      <div className="row g-4">
        <div className="col-md-6">
          <img
            src={`http://localhost:5050/uploads/${product.image}`}
            alt={product.title}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <h2>{product.title}</h2>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Location:</strong> {product.location}</p>
          <p><strong>Date Lost:</strong> {new Date(product.dateLost).toLocaleDateString()}</p>
          <p><strong>Contact Info:</strong> {product.contactInfo}</p>
          <p><strong>Status:</strong> {product.isFound ? 'Found' : 'Still Lost'}</p>

          {isOwner && (
            <div className="mt-3">
              <button
                className="btn btn-primary me-2"
                onClick={() => navigate(`/edit/${product._id}`)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger me-2"
                onClick={handleDelete}
              >
                Delete
              </button>
              {!product.isFound && (
                <button
                  className="btn btn-success"
                  onClick={handleMarkAsFound}
                >
                  Mark as Found
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
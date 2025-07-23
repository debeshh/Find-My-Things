import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      parsedUser._id = parsedUser._id || parsedUser.id;
      setUser(parsedUser);
    }

    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://find-my-things.onrender.com/api/lost/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProduct(res.data);
      } catch (err) {
        console.error('Error fetching product:', err.message);
        navigate('/login');
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://find-my-things.onrender.com/api/lost/${id}`, {
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
      await axios.patch(`https://find-my-things.onrender.com/api/lost/${id}/found`, {}, {
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

  if (!product) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container my-5">
      <div className="row g-5 align-items-start">
        
        {/* Image */}
        <div className="col-md-6">
          <div className="card border-0 shadow-sm">
            <img
              src={`https://find-my-things.onrender.com/uploads/${product.image}`}
              alt={product.title}
              className="card-img-top rounded"
            />
          </div>
        </div>

        {/* Details */}
        <div className="col-md-6">
          <h2 className="fw-bold mb-3">{product.title}</h2>
          <div className="mb-3">
            <span className="badge bg-secondary me-2">{product.category}</span>
            <span className={`badge ${product.isFound ? 'bg-success' : 'bg-warning text-dark'}`}>
              {product.isFound ? 'Found' : 'Still Lost'}
            </span>
          </div>

          <p className=""><strong>Description:</strong> {product.description}</p>
          <p><strong>Location:</strong> {product.location}</p>
          <p><strong>Date Lost:</strong> {new Date(product.dateLost).toLocaleDateString()}</p>

          {/* Contact Section */}
          <div className="border p-4 rounded bg-light mt-4">
            <h5 className="fw-semibold mb-2 text-primary">📞 Contact the Finder</h5>
            <p className="mb-0 text-dark">{product.contactInfo}</p>
          </div>

          {/* Action Buttons */}
          {isOwner && (
            <div className="mt-4 d-flex flex-wrap gap-3">
              <button
                className="btn btn-outline-primary"
                onClick={() => navigate(`/edit/${product._id}`)}
              >
                Edit
              </button>
              <button
                className="btn btn-outline-danger"
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
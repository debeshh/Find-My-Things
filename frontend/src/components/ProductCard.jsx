import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product }) {
  const {
    _id,
    title,
    description,
    category,
    image,
    location,
    dateLost,
    isFound,
    type,
  } = product;

  const statusBadge = isFound ? (
    <span className="badge bg-success px-3 py-2 rounded-pill position-absolute top-0 start-0 m-3 shadow">
      Found
    </span>
  ) : (
    <span className="badge bg-danger px-3 py-2 rounded-pill position-absolute top-0 start-0 m-3 shadow">
      Lost
    </span>
  );

  return (
    <div className="card custom-product-card bg-dark text-light border-0 rounded-4 shadow-lg overflow-hidden position-relative">
      {statusBadge}
      <div className="image-container">
        <img
          src={`http://localhost:5050/uploads/${image}`}
          alt={title}
          className="card-img-top object-fit-cover"
        />
      </div>
      <div className="card-body d-flex flex-column p-4">
        <h4 className="card-title text-capitalize fw-semibold mb-3">{title}</h4>
        <ul className="list-unstyled mb-3 small">
          <li><strong>Category:</strong> {category}</li>
          <li><strong>Location:</strong> {location}</li>
          <li><strong>Date Lost:</strong> {new Date(dateLost).toLocaleDateString()}</li>
          <li><strong>Type:</strong> {type}</li>
        </ul>
        <p className="card-text mb-3"><strong>Description:</strong> {description}</p>
        <Link to={`/lost/${_id}`} className="btn btn-outline-light mt-auto">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
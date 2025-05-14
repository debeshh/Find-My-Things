import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          Find my Thing
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
          <ul className="navbar-nav me-auto ms-3">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/lost">Lost Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/found">Found Products</Link>
            </li>
            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/addlostitem">Report Lost Item</Link>
              </li>
            )}
          </ul>

          <ul className="navbar-nav ms-auto align-items-center">
            {!user ? (
              <>
                <li className="nav-item me-2">
                  <Link className="btn btn-outline-primary" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item me-3 d-flex align-items-center">
                  <span className="text-muted me-2">Hi, {user.name}</span>
                  <Link to="/profile" className="nav-link p-0">
                    <i className="fas fa-user-circle fa-lg text-primary"></i>
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger rounded-pill px-4" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
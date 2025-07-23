import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import './Navbar.css'; 

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/" onClick={closeNavbar}>
          Find my Thing
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNavDropdown"
          aria-expanded={isOpen ? 'true' : 'false'}
          aria-label="Toggle navigation"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNavDropdown">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={closeNavbar}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/lost" onClick={closeNavbar}>Lost Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/found" onClick={closeNavbar}>Found Products</Link>
            </li>
            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/addlostitem" onClick={closeNavbar}>Report Lost Item</Link>
              </li>
            )}
          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {!user ? (
              <>
                <li className="nav-item me-2">
                  <Link className="btn btn-outline-primary w-100 mb-2 mb-lg-0" to="/login" onClick={closeNavbar}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary w-100" to="/register" onClick={closeNavbar}>
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item d-flex align-items-center me-3">
                  <span className="text-muted me-2">Hi, {user.name}</span>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger rounded-pill px-4 w-100"
                    onClick={handleLogout}
                  >
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
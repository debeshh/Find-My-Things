import { Link } from 'react-router-dom';
import './Footer.css'; 

function Footer() {
  return (
    <footer className="bg-dark text-light pt-4 pb-3 mt-auto">
      <div className="container text-center text-md-start">
        <div className="row">

          <div className="col-md-4 mb-3">
            <h5 className="fw-bold text-warning color-white">FindMyThing</h5>
            <p>Your trusted platform to report, recover, and reunite lost items within your community.</p>
          </div>

          <div className="col-md-4 mb-3">
            <h6 className="text-uppercase fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="footer-link">Lost Products</Link></li>
              <li><Link to="/found" className="footer-link">Found Products</Link></li>
              <li><Link to="/addlostitem" className="footer-link">Report Lost Item</Link></li>
            </ul>
          </div>

          <div className="col-md-4 mb-3 mt-5">
            <h6 className="text-uppercase fw-bold">Connect</h6>
            <a href="https://twitter.com" className="text-light me-3"><i className="fab fa-twitter"></i></a>
            <a href="https://facebook.com" className="text-light me-3"><i className="fab fa-facebook"></i></a>
            <a href="https://instagram.com" className="text-light"><i className="fab fa-instagram"></i></a>
          </div>

        </div>
      </div>
      <div className="text-center pt-3 border-top mt-3" style={{ fontSize: '0.9rem' }}>
        © {new Date().getFullYear()} FindMyThing. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
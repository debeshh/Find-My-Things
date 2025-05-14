// HomePage.jsx
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
<div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: 'rgb(30, 30, 30)' }}>
        {/* Hero Section */}
      <div className="container my-5 flex-grow-1 d-flex align-items-center justify-content-between">
        <div>
          <h1 className="display-4 fw-bold">The best way to find <br/>what you've lost.</h1>
          <p className="lead mt-3 mb-4">
            Report lost items, explore found ones, and reunite with what matters to you.
          </p>
          <div className="d-flex gap-3">
            <Link to="/addlostitem" className="btn btn-primary btn-lg">Report Lost Item</Link>
            <Link to="/lost" className="btn btn-outline-secondary btn-lg">View Lost Items</Link>
          </div>
        </div>
        <div>
          <img
            src="https://cdsassets.apple.com/live/7WUAS350/images/icloud/ios14-5-find-my-items-hero.png"
            alt="FindMyThing illustration"
            style={{ maxWidth: '450px' }}
          />
        </div>
      </div>

      {/* Trusted Section */}
      <div className="text-center py-4 mb-5">
  <p className="text-secondary">Trusted by individuals and teams at the world's top institutions</p>
  <div className="d-flex justify-content-center gap-4 flex-wrap">
    <span className="text-secondary">IIT</span>
    <span className="text-secondary">NIT</span>
    <span className="text-secondary">BITS</span>
    <span className="text-secondary">AIIMS</span>
    <span className="text-secondary">IIM</span>
  </div>
</div>
    </div>
  );
};

export default HomePage;
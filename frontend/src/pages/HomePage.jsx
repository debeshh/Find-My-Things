import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div
      className="min-vh-100  mt-5 mb-5 d-flex flex-column"
      style={{ backgroundColor: "rgb(30, 30, 30)" }}
    >
      {/* Hero Section */}
      <div className="container my-5 mt-5 mb-5 flex-grow-1">
        <div className="row align-items-center">
          {/* Left Text Section */}
          <div className="col-md-6 mb-4 mb-md-0 text-center text-md-start">
            <h1 className="display-4 fw-bold">
              The best way to find <br /> what you've lost.
            </h1>
            <p className="lead mt-3 mb-4">
              Report lost items, explore found ones, and reunite with what
              matters to you.
            </p>
            <div className="d-flex flex-wrap justify-content-center justify-content-md-start gap-3">
              <Link to="/addlostitem" className="btn btn-primary btn-lg">
                Report Lost Item
              </Link>
              <Link to="/lost" className="btn btn-outline-secondary btn-lg">
                View Lost Items
              </Link>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="col-md-6 text-center">
            <img
              src="https://cdsassets.apple.com/live/7WUAS350/images/icloud/ios14-5-find-my-items-hero.png"
              alt="FindMyThing illustration"
              className="img-fluid"
              style={{ maxWidth: "350px" }}
            />
          </div>
        </div>
      </div>
      {/* Features Section */}
      <div className="container my-5">
        <h2 className="text-center mb-4">Why Choose Us?</h2>
        <div className="row text-center mt-5">
          <div className="col-md-4  mb-4">
            <div className="card bg-dark text-white border h-100">
              <div className="card-body">
                <h5 className="card-title">Community Driven</h5>
                <p className="card-text">
                  Join a community of individuals helping each other find lost
                  items.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card bg-dark border text-white h-100">
              <div className="card-body">
                <h5 className="card-title">Easy to Use</h5>
                <p className="card-text">
                  Simple interface to report and search for lost items.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card bg-dark text-white border  h-100">
              <div className="card-body">
                <h5 className="card-title">Secure and Private</h5>
                <p className="card-text">
                  Your data is secure and your privacy is our priority.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Stats Section */}
      <div className="container mt-5 d-flex flex-wrap justify-content-between gap-3 pb-5">
        <div className="bg-dark border rounded p-4 flex-fill text-center">
          <p className="mb-1">Active listings</p>
          <h3>50+</h3>
        </div>
        <div className="bg-dark border rounded p-4 flex-fill text-center">
          <p className="mb-1">Items reported</p>
          <h3>20+</h3>
        </div>
        <div className="bg-dark border rounded p-4 flex-fill text-center">
          <p className="mb-1">Items returned</p>
          <h3>11+</h3>
        </div>
        <div className="bg-dark border rounded p-4 flex-fill text-center">
          <p className="mb-1">Post item</p>
          <h3>
            Now <span className="ms-2">➡️</span>
          </h3>
        </div>
      </div>

      {/* Trusted Section */}
      <div className="text-center py-4 mb-5">
        <p className="text-secondary">
          Trusted by individuals and teams at the world's top institutions
        </p>
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

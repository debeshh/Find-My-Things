import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const FoundProducts = () => {
  const [foundProducts, setFoundProducts] = useState([]);

  useEffect(() => {
    const fetchFoundProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5050/api/lost');
        const found = res.data.filter((product) => product.isFound);
        setFoundProducts(found);
      } catch (err) {
        console.error('Error fetching found products:', err);
      }
    };

    fetchFoundProducts();
  }, []);

  

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Found Products</h2>
      {foundProducts.length === 0 ? (
        <p>No products have been marked as found yet.</p>
      ) : (
        <div className="row">
          {foundProducts.map((product) => (
            <div className="col-md-4 d-flex align-items-stretch mb-4" key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoundProducts;
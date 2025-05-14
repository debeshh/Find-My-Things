import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

function LostProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchLostProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5050/api/lost');
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching lost products:', err.message);
      }
    };

    fetchLostProducts();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Lost Items</h2>
      {products.filter((product) => !product.isFound).length === 0 ? (
        <p>No lost items reported yet.</p>
      ) : (
        <div className="row">
          {products
            .filter((product) => !product.isFound)
            .map((product) => (
              <div className="col-md-4 mb-4" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default LostProducts;
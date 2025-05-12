import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

function HomePage() {
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
      <h2 className="mb-4">Lost Products</h2>
      {products.filter((product) => !product.isFound).length === 0 ? (
        <p>No lost products found.</p>
      ) : (
        products
          .filter((product) => !product.isFound)
          .map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
      )}
    </div>
  );
}

export default HomePage;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from './components/Navbar';
import Home from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetails from './pages/ProductDetails';
import FoundProducts from './pages/FoundProducts';
import AddLostItem from './pages/AddLostItem';
import UpdateProductPage from './pages/UpdateProductPage';
import LostProducts from './pages/LostProducts';
import Footer from './components/Footer';
import ProfilePage from './components/ProfilePage';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lost/:id" element={<ProductDetails />} />
        <Route path="/found" element={<FoundProducts />} />
        <Route path="/addlostitem" element={<AddLostItem />} />
        <Route path="/edit/:id" element={<UpdateProductPage />} />
        <Route path="/lost" element={<LostProducts />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
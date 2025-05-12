import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // ✅ Import AuthContext

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Destructure login from context

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5050/api/users/login', {
        email,
        password,
      });
  
      login(res.data.user); // ✅ Context
      localStorage.setItem('user', JSON.stringify(res.data.user)); // ✅ LocalStorage
      localStorage.setItem('token', res.data.token); // ✅ Token
  
      navigate('/');
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="container mt-5 mb-5 " style={{ maxWidth: '500px' }}>
      <h2 className="mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
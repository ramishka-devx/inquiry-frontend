import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthService from '../services/auth.service';
import '../styles/Auth.css';

interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
  });  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Set document title
  useEffect(() => {
    document.title = 'Login - Ruhuna Engineering Faculty MRS';
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };  // Check for messages from signup or other pages
  useEffect(() => {
    const state = location.state as { message?: string } | null;
    if (state && state.message) {
      setSuccessMessage(state.message);
      setError(null);
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await AuthService.login(loginData.email, loginData.password);
      
      // Redirect to dashboard or home
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <div className="logo-container">
          <img src="https://i.ibb.co/8g7YbrFg/logo-uor.png" alt="University Logo" className="university-logo" />
          <h1 className="auth-title">Ruhuna Engineering Faculty</h1>
          <img src="https://i.ibb.co/gL5gfBCW/logo-eng.jpg" alt="Faculty Logo" className="faculty-logo" />
        </div>
        <h2 className="auth-subtitle">Maintenance Requisition System</h2>
      </div>

      <div className="auth-form-container">        <h2>Login</h2>
        
        {error && <div className="alert alert-danger">{error}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        <form onSubmit={handleSubmit}>          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={loginData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? 'LOGGING IN...' : 'LOGIN'}
          </button>
        </form>
        
        <div className="auth-links">
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>

      <div className="auth-footer">
        <p>Powered by Scorpion X</p>
      </div>
    </div>
  );
};

export default Login;

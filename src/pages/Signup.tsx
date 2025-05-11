import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import '../styles/Auth.css';

interface SignupData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

const Signup: React.FC = () => {
  const [signupData, setSignupData] = useState<SignupData>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  
  // Set document title
  useEffect(() => {
    document.title = 'Sign Up - Ruhuna Engineering Faculty MRS';
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validate password match
    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password length
    if (signupData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);    // Handle form submission
    const { confirmPassword, ..._ } = signupData; // Remove confirmPassword from data
    try {
      // Use our auth service for registration
      await AuthService.register(
        signupData.first_name,
        signupData.last_name,
        signupData.email,
        signupData.password,
        signupData.phone
      );
      
      // Redirect to login page after successful registration
      navigate('/login', { state: { message: 'Registration successful. Please log in.' } });
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred during registration');
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

      <div className="auth-form-container">
        <h2>Sign Up</h2>
        
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleSubmit}>          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={signupData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="first_name">First Name *</label>
            <input
              type="text"
              className="form-control"
              id="first_name"
              name="first_name"
              value={signupData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="last_name">Last Name *</label>
            <input
              type="text"
              className="form-control"
              id="last_name"
              name="last_name"
              value={signupData.last_name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              value={signupData.phone}
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
              value={signupData.password}
              onChange={handleChange}
              required
            />
            <small className="form-text text-muted">Password must be at least 6 characters long</small>
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password *</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={signupData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          
          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? 'SIGNING UP...' : 'SIGN UP'}
          </button>
        </form>
        
        <div className="auth-links">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>

      <div className="auth-footer">
        <p>Powered by Scorpion X</p>
      </div>
    </div>
  );
};

export default Signup;

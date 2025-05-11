import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import AuthService from '../services/auth.service';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  // Set document title
  useEffect(() => {
    document.title = 'Dashboard - Ruhuna Engineering Faculty MRS';
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };
  return (
    <div className="dashboard-container">
      <header className="main-header">
        <div className="header-content">
          <div className="logo-container">
            <img src="https://i.ibb.co/8g7YbrFg/logo-uor.png" alt="University Logo" className="university-logo" />
            <div className="title-container">
              <h1 className="main-title">Ruhuna Engineering Faculty</h1>
              <h2 className="sub-title">Maintenance Requisition System</h2>
            </div>
            <img src="https://i.ibb.co/gL5gfBCW/logo-eng.jpg" alt="Faculty Logo" className="faculty-logo" />
          </div>
          <div className="user-info">
            <span>Welcome, {user.first_name || 'User'}</span>
            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </header>

      <div className="content-container">
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h3>Dashboard</h3>
                </div>
                <div className="card-body">
                  <h5 className="card-title">Welcome to the Maintenance Requisition System</h5>
                  <p className="card-text">
                    You have successfully logged into the Ruhuna Engineering Faculty Maintenance Requisition System.
                  </p>
                  <p>From here, you can submit maintenance requests, track their status, and communicate with maintenance staff.</p>
                  
                  {/* Placeholder for requisition system functionality */}
                  <div className="dashboard-actions mt-4">
                    <button className="btn btn-primary me-2">New Request</button>
                    <button className="btn btn-info me-2">My Requests</button>
                    <button className="btn btn-secondary">View Status</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="dashboard-footer">
        <p>Powered by Scorpion X</p>
      </footer>
    </div>
  );
};

export default Dashboard;

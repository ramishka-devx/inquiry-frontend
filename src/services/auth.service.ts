// This file handles API calls related to authentication
import axios from 'axios';

// Base URL for API calls
const API_URL = 'http://localhost:3000';

// Authentication service class
class AuthService {
  // Login method
  login(email: string, password: string) {
    return axios.post(`${API_URL}/auth/login`, { email, password })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('token', response.data.accessToken);
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
      });
  }

  // Logout method
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Register method
  register(first_name: string, last_name: string, email: string, password: string, phone: string) {
    return axios.post(`${API_URL}/auth/register`, {
      first_name,
      last_name,
      email,
      password,
      phone
    });
  }

  // Get current user
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }
}

const authServiceInstance = new AuthService();
export default authServiceInstance;

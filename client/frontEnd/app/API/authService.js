// API service for authentication
// Hardcoding the API URL to fix the connection issue
const API_URL = 'http://localhost:5000/api/users';

// Register user
export const registerUser = async (userData) => {
  try {
    console.log('Attempting to register with:', API_URL);
    console.log('User data:', userData);
    
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();
    console.log('Register response:', data);
    
    if (response.ok) {
      // Store user data in localStorage
      if (data.token) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
      }
      return { success: true, data };
    } else {
      return { success: false, message: data.message || 'Registration failed' };
    }
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, message: error.message || 'Something went wrong' };
  }
};

// Login user
export const loginUser = async (userData) => {
  try {
    console.log('Attempting to login with:', API_URL);
    
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });

    const data = await response.json();
    
    if (response.ok) {
      // Store user data in localStorage
      if (data.token) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
      }
      return { success: true, data };
    } else {
      return { success: false, message: data.message || 'Login failed' };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: error.message || 'Something went wrong' };
  }
};

// Logout user
export const logout = () => {
  // Remove user from local storage
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

// Get current user
export const getCurrentUser = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  return null;
};

// Get user token
export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return getToken() !== null;
}; 
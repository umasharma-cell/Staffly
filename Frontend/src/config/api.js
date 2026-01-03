// API Configuration
// This file centralizes all API endpoints

// Get the base URL from environment variable or use default for local development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

// Export all API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/auth/login`,
  SIGNUP: `${API_BASE_URL}/auth/signup`,

  // Employee endpoints
  EMPLOYEES: `${API_BASE_URL}/employees`,

  // Add more endpoints as needed
};

// Helper function to get headers with auth token
export const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'auth': localStorage.getItem('token') || ''
});

export default API_BASE_URL;
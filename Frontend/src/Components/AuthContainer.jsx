import React from 'react';
import '../styles/AuthContainer.css';

const AuthContainer = ({ children }) => {
  return (
    <div className="auth-container">
      <div className="auth-left">
        {children}
      </div>
      <div className="auth-right">
        <div className="image-container">
          <img 
            src="/images/auth-banner.jpg" 
            alt="Workspace" 
            className="auth-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80";
            }}
          />
          <div className="image-overlay">
            <h2>Welcome to WorkSpace</h2>
            <p>Your collaborative workspace solution</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer; 
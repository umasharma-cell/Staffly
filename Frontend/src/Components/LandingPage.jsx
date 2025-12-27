import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-box">
      <header className="header">
        <h1 className="logo">WorkSpace</h1>
      </header>
      
      <div className="content">
        <div className="text-content">
          <h2>Employee management system</h2>
          <br>
          </br>
          <h1>Manage your global employee data effortlessly</h1>
          <br></br>
          <br></br>
          <p>
            Redefine the employee experience with a streamlined and secure HR
            software that helps manage your global workforce seamlessly, from
            adding and maintaining employee records to assisting team members
            with their daily HR work, all while ensuring compliance.
          </p>
          <br></br>
          <br></br>
          <br></br>
          <div className="buttons">
            <Link to="/signup" className="button signup">Sign Up</Link>
            <Link to="/login" className="button login">Login</Link>
          </div>
        </div>
        <div className="image-content">
        <img src="/images/manage.png" alt="Workspace img" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
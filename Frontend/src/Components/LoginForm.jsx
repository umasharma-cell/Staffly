import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api";
import "../styles/ModernAuth.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);

        // Show success message
        setSuccessMessage("Login successful! Redirecting to dashboard...");

        // Clear the form
        setFormData({
          email: "",
          password: "",
        });

        // Redirect after a brief delay
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modern-auth-container">
      {/* Animated Background */}
      <div className="auth-background">
        <div className="gradient-bg"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        <div className="grid-pattern"></div>
      </div>

      {/* Left Side - Branding */}
      <div className="auth-left-panel">
        <div className="brand-container">
          <div className="logo-wrapper">
            <div className="logo-icon-large">S</div>
            <h1 className="brand-name">Staffly</h1>
          </div>

          <div className="brand-content">
            <h2 className="brand-title">
              Welcome back to
              <span className="gradient-text"> Staffly</span>
            </h2>
            <p className="brand-description">
              Your complete HR management solution awaits
            </p>

            <div className="features-list">
              <div className="feature-item">
                <span className="feature-icon">📊</span>
                <span>View real-time analytics</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">👥</span>
                <span>Manage your team efficiently</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🚀</span>
                <span>Streamline HR processes</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🔒</span>
                <span>Secure data management</span>
              </div>
            </div>

            <div className="testimonial">
              <p>"Staffly has revolutionized our HR department. The intuitive interface and powerful features make managing our 500+ employees effortless."</p>
              <div className="testimonial-author">
                <img src="https://ui-avatars.com/api/?name=Michael+Chen&background=667eea&color=fff" alt="Michael" />
                <div>
                  <strong>Michael Chen</strong>
                  <span>CEO, InnovateTech</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="auth-right-panel">
        <div className="auth-form-wrapper">
          <div className="form-header">
            <h2 className="form-title">Sign In</h2>
            <p className="form-subtitle">
              Don't have an account?
              <Link to="/signup" className="link-text"> Create one</Link>
            </p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="success-message animated-fade-in">
              <span className="success-icon">✓</span>
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="modern-auth-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <span className="input-icon">✉️</span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  placeholder="you@company.com"
                  onChange={handleChange}
                  required
                  className="modern-input"
                />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label htmlFor="password">Password</label>
                <a href="#" className="link-text" style={{ fontSize: '0.85rem' }}>
                  Forgot password?
                </a>
              </div>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  placeholder="Enter your password"
                  onChange={handleChange}
                  required
                  className="modern-input"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="checkmark"></span>
                <span className="checkbox-text">
                  Remember me for 30 days
                </span>
              </label>
            </div>

            <button
              type="submit"
              className={`submit-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <span className="button-arrow">→</span>
                </>
              )}
            </button>

            <div className="divider">
              <span>OR</span>
            </div>

            <div className="social-auth">
              <button type="button" className="social-button google">
                <span>G</span>
                Continue with Google
              </button>
              <button type="button" className="social-button microsoft">
                <span>M</span>
                Continue with Microsoft
              </button>
            </div>
          </form>

          <div className="form-footer">
            <p>
              Need help? <a href="#" className="link-text">Contact Support</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api";
import "../styles/ModernAuth.css";

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Check password strength
    if (e.target.name === 'password') {
      checkPasswordStrength(e.target.value);
    }
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    setPasswordStrength(strength);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage("");

    try {
      const response = await fetch(API_ENDPOINTS.SIGNUP, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        // Show success message
        setSuccessMessage("Account created successfully! Redirecting to login...");

        // Clear the form after successful signup
        setFormData({
          name: "",
          email: "",
          password: "",
        });

        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
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
              Start Your Journey with
              <span className="gradient-text"> Staffly</span>
            </h2>
            <p className="brand-description">
              Join thousands of companies transforming their HR management
            </p>

            <div className="features-list">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Smart employee management</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Real-time analytics dashboard</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Automated HR workflows</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Bank-level security</span>
              </div>
            </div>

            <div className="testimonial">
              <p>"Staffly transformed how we manage our team. It's intuitive, powerful, and saves us hours every week."</p>
              <div className="testimonial-author">
                <img src="https://ui-avatars.com/api/?name=Sarah+Johnson&background=667eea&color=fff" alt="Sarah" />
                <div>
                  <strong>Sarah Johnson</strong>
                  <span>HR Director, TechCorp</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="auth-right-panel">
        <div className="auth-form-wrapper">
          <div className="form-header">
            <h2 className="form-title">Create Account</h2>
            <p className="form-subtitle">
              Already have an account?
              <Link to="/login" className="link-text"> Sign in</Link>
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
              <label htmlFor="name">Full Name</label>
              <div className="input-wrapper">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  placeholder="Enter your full name"
                  onChange={handleChange}
                  required
                  className="modern-input"
                />
              </div>
            </div>

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
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  placeholder="Create a strong password"
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

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="password-strength">
                  <div className="strength-bars">
                    <span className={`bar ${passwordStrength >= 1 ? 'active' : ''}`}></span>
                    <span className={`bar ${passwordStrength >= 2 ? 'active' : ''}`}></span>
                    <span className={`bar ${passwordStrength >= 3 ? 'active' : ''}`}></span>
                    <span className={`bar ${passwordStrength >= 4 ? 'active' : ''}`}></span>
                  </div>
                  <span className="strength-text">
                    {passwordStrength === 0 && 'Very Weak'}
                    {passwordStrength === 1 && 'Weak'}
                    {passwordStrength === 2 && 'Fair'}
                    {passwordStrength === 3 && 'Good'}
                    {passwordStrength === 4 && 'Strong'}
                  </span>
                </div>
              )}
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-container">
                <input type="checkbox" required />
                <span className="checkmark"></span>
                <span className="checkbox-text">
                  I agree to the <a href="#" className="link-text">Terms of Service</a> and{" "}
                  <a href="#" className="link-text">Privacy Policy</a>
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
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
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

export default SignupForm;
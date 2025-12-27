import { useState } from "react";
import AuthContainer from "./AuthContainer";
import "../styles/SignupForm.css";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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
          setIsLoggedIn(true);
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

  // If logged in, show the Sidebar component
  if (isLoggedIn) {
    return <Sidebar />;
  }

  // Otherwise show the login form
  return (
    <>
      <Navbar />
      <AuthContainer>
        <div className="auth-form-container">
          <h2>Welcome Back!</h2>
          <p className="subtitle">Sign in to continue to your workspace</p>

          {/* Success Message */}
          {successMessage && (
            <div style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '12px',
              borderRadius: '4px',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Email address"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                value={formData.password}
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </AuthContainer>
    </>
  );
};

export default LoginForm;

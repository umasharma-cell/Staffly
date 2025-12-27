import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContainer from "./AuthContainer";
import "../styles/SignupForm.css";
import Navbar from "./Navbar";

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
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
      const response = await fetch("http://localhost:4000/auth/signup", {
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
    <>
    <Navbar />
      <AuthContainer>
        <div className="auth-form-container">
          <h2>Join WorkSpace</h2>
          <p className="subtitle">Create your account to get started</p>

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
                type="text"
                name="name"
                value={formData.name}
                placeholder="Full name"
                onChange={handleChange}
                required
              />
            </div>
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
                placeholder="Create password"
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        </div>
        
      </AuthContainer>
    </>
  );
};

export default SignupForm;

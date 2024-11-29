import { useState, useEffect } from "react";
import axios from "axios";
import "./forgotpassword.css";

export function ForgotPassword() {
  // State for form data and error handling
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // To track if the request is in progress

  // Handle change in form fields
  const handleChange = ({ target: { id, value } }) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Password strength validation (example: minimum 6 characters)
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true); // Start loading state

    // Send reset request to the backend
    axios
      .post("http://localhost:5000/forgot-password", {
        email: formData.email,
        Password: formData.password,
      })
      .then((response) => {
        // Handle successful password reset
        alert("Password has been reset successfully!");
        // Redirect to login or homepage if needed
        window.location.href = "/login";
      })
      .catch((error) => {
        // Handle error (e.g., invalid email, server issues)
        setError(error.response?.data?.error || "Failed to reset password.");
      })
      .finally(() => {
        setLoading(false); // End loading state after request is complete
      });
  };
// Basic validation to ensure passwords match
    useEffect(() => {
        if (formData.newPassword !== formData.repeatPassword) {
          console.log("Passwords do not match!");
        } else {
          console.log("Passwords match!");
        }
      }, [formData.newPassword, formData.repeatPassword]);

  return (
    <div className="body-forgotpw">
      <div className="content-spacing"></div>
      <div className="container-forgot">
        <div className="image-section-password"></div>
        <div className="forgot-section">
          <h2>
            FORGOT <br /> PASSWORD?
          </h2>
          <form onSubmit={handleSubmit}>
            <p>
              Enter your email and new password to reset your account password.
            </p>
            {error && <p className="error-message">{error}</p>} {/* Error message */}
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                placeholder="Enter Your New Password"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="repeatPassword">Repeat New Password</label>
              <input
                type="password"
                id="repeatPassword"
                placeholder="Repeat Your New Password"
                value={formData.repeatPassword}
                onChange={handleChange}
                required
              />
            </div>
            
            <button type="submit" className="login-button-main" disabled={loading}>
              {loading ? "Resetting..." : "SUBMIT"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

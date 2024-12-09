import { useState, useEffect } from 'react';
import axios from 'axios';
import './forgotpassword.css';

export function ForgotPassword() {
  // State for form data and error handling
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    repeatPassword: '',
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

    // Password strength validation
    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    // Password match validation
    if (formData.newPassword !== formData.repeatPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true); // Start loading state

    // Send reset request to the backend
    axios
      .post('http://localhost:5000/forgot-password', {
        email: formData.email,
        password: formData.newPassword, // Menggunakan key yang sesuai untuk backend
      })
      .then(() => {
        alert('Password has been reset successfully!');
        // Redirect to login page after successful reset
        window.location.href = '/login';
      })
      .catch((error) => {
        // Display error message if reset fails
        alert(error.response?.data?.error || 'Failed to reset password. Please try again.');
      })
      .finally(() => {
        setLoading(false); // End loading state
      });
  };

  // Basic validation to ensure passwords match
  useEffect(() => {
    if (formData.newPassword !== formData.repeatPassword) {
      console.log('Passwords do not match!');
    } else {
      console.log('Passwords match!');
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
            <p className="text-forgot">Enter your email and new password to reset your account password.</p>
            {error && <p className="error-message">{error}</p>} {/* Error message */}
            <div className="form-group">
              <label htmlFor="email">
                <b>Email</b>
              </label>
              <input type="email" id="email" placeholder="Enter Your Email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">
                <b>New Password</b>
              </label>
              <input type="password" id="newPassword" placeholder="Enter Your New Password" value={formData.newPassword} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="repeatPassword">
                <b>Repeat New Password</b>
              </label>
              <input type="password" id="repeatPassword" placeholder="Repeat Your New Password" value={formData.repeatPassword} onChange={handleChange} required />
            </div>
            <button type="submit" className="login-button-main" disabled={loading}>
              {loading ? 'Resetting...' : 'SUBMIT'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

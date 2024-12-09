import './signup.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

export function Signup() {
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    // Untuk mencegah spasi di input username
    if (id === 'username') {
      setSignupData({
        ...signupData,
        [id]: value.replace(/\s/g, ''), // Hapus semua spasi
      });
    } else {
      setSignupData({
        ...signupData,
        [id]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi field kosong
    if (!signupData.name || !signupData.email || !signupData.username || !signupData.password || !signupData.confirmPassword) {
      alert('Please fill all the fields!');
      return;
    }

    // Cek password cocok
    if (signupData.password !== signupData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    console.log('Signup Data:', signupData); // Debugging data

    axios
      .post('http://localhost:5000/signup', signupData)
      .then((response) => {
        alert('Signup successful! Please log in.');
        // localStorage.setItem("token", response.data.token);
        // Redirect to login page after successful signup
        window.location.href = '/login';
      })
      .catch((error) => {
        // Display error message if signup fails
        alert(error.response?.data?.error || 'Signup failed, please try again');
      });
  };

  useEffect(() => {
    if (signupData.password !== signupData.confirmPassword) {
      console.log('Passwords do not match!');
    } else {
      console.log('Passwords match!');
    }
  }, [signupData.password, signupData.confirmPassword]);

  return (
    <div className="body-signup">
      <div className="content-spacing"></div>
      <div className="container-signup">
        <div className="image-section-signup"></div>
        <div className="login-section-3">
          <h2>
            <b>SIGN UP</b>
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Name and Username in One Row */}
            <div className="form-row">
              <div className="form-group-inline">
                <label htmlFor="name">
                  <b>Name</b>
                </label>
                <input onChange={handleChange} type="text" id="name" placeholder="Enter Your Name" value={signupData.name} />
              </div>
              <div className="form-group-inline">
                <label htmlFor="username">
                  <b>Username</b>
                </label>
                <input onChange={handleChange} type="text" id="username" placeholder="Enter Your Username" value={signupData.username} />
              </div>
            </div>

            {/* Email, Password, and Confirm Password Fields */}
            <div className="form-group-1">
              <label htmlFor="email">
                <b>Email</b>
              </label>
              <input onChange={handleChange} type="email" id="email" placeholder="Enter Your Email" value={signupData.email} />
            </div>

            <div className="form-group-1">
              <label htmlFor="password">
                <b>Password</b>
              </label>
              <input onChange={handleChange} type="password" id="password" placeholder="Enter Your Password" value={signupData.password} />
            </div>

            <div className="form-group-1">
              <label htmlFor="confirmPassword">
                <b>Confirm Password</b>
              </label>
              <input onChange={handleChange} type="password" id="confirmPassword" placeholder="Confirm Your Password" />
            </div>

            <button type="submit" className="login-button-main-up">
              SIGN UP
            </button>
          </form>
          <div className="signup">
            Already have an account?{' '}
            <a href="/Login">
              <b>Login</b>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

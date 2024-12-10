import styles from './login.module.css';
import { useState } from 'react';
import axios from 'axios';

export function Login() {
  // State to store the login form data
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  // Handle change in form input fields
  const handleChange = ({ target: { id, value } }) => {
    setLoginData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:5000/login', loginData)
      .then((response) => {
        console.log('Login response:', response.data); // Debugging untuk melihat respons server

        // Pastikan response.data memiliki token, id, dan username
        if (response.data.token) {
          localStorage.setItem('token', response.data.token); // Simpan token
          localStorage.setItem('id', JSON.stringify(response.data.id)); // Simpan id (format JSON)
          localStorage.setItem('username', response.data.username); // Simpan username
          localStorage.setItem('profile_image',response.data.profile_image );
          console.log('Data successfully stored in localStorage');

          // Redirect ke halaman utama
          window.location.href = '/';
        } else {
          alert('Token is missing in the response'); // Pesan error jika token tidak ada
        }
      })
      .catch((error) => {
        alert(error.response?.data?.error || 'Login failed, please try again');
      });
  };

  return (
    <div className={styles['body-login']}>
      <div className={styles['content-spacing']}></div>
      <div className={styles['container-login']}>
        <div className={styles['image-section']}></div>
        <div className={styles['login-section']}>
          <h2>
            <b>LOGIN</b>
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Username input */}
            <div className={styles['form-group']}>
              <label htmlFor="username">
                <b>Username</b>
              </label>
              <input
                onChange={handleChange}
                type="text"
                id="username" // Consistent ID for the username
                placeholder="Enter Your Username"
                value={loginData.username} // Controlled input with correct value
                required
              />
            </div>
            {/* Password input */}
            <div className={styles['form-group']}>
              <label htmlFor="password">
                <b>Password</b>
              </label>
              <input
                onChange={handleChange}
                type="password"
                id="password"
                placeholder="Enter Your Password"
                value={loginData.password} // Controlled input with correct value
                required
              />
            </div>
            {/* Forgot password link */}
            <a href="/forgotpassword" className={styles['forgot-password']}>
              Forgot Password?
            </a>
            {/* Submit button */}
            <button type="submit" className={styles['login-button-main']}>
              LOGIN
            </button>
          </form>
          {/* Sign up link */}
          <div className={styles['signup']}>
            Don&apos;t have an account?{' '}
            <a href="/signup">
              <b>Sign Up Now</b>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

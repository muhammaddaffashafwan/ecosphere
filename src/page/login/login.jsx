import styles from "./login.module.css";
import { useState } from "react";
import axios from "axios";

export function Login() {
	// State to store the login form data
	const [loginData, setLoginData] = useState({
		username: "",
		password: "",
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
			.post("http://localhost:5000/login", loginData)
			.then((response) => {
				localStorage.setItem("token", response.data.token);
				localStorage.setItem("user", JSON.stringify(response.data.user));
				// Redirect to home page after successful login
				window.location.href = "/";
			})
			.catch((error) => {
				// Display error message if login fails
				alert(error.response?.data?.error || "Login failed, please try again");
			});
	};

	return (
		<div className={styles["body-login"]}>
			<div className={styles["content-spacing"]}></div>
			<div className={styles["container-login"]}>
				<div className={styles["image-section"]}></div>
				<div className={styles["login-section"]}>
					<h2>LOGIN</h2>
					<form onSubmit={handleSubmit}>
						{/* Username input */}
						<div className={styles["form-group"]}>
							<label htmlFor="username">Username</label>
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
						<div className={styles["form-group"]}>
							<label htmlFor="password">Password</label>
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
						<a href="/forgotpassword" className={styles["forgot-password"]}>
							Forgot Password?
						</a>
						{/* Submit button */}
						<button type="submit" className={styles["login-button-main"]}>
							LOGIN
						</button>
					</form>
					{/* Sign up link */}
					<div className={styles["signup"]}>
						Don&apos;t have an account? <a href="/signup">Sign Up Now</a>
					</div>
				</div>
			</div>
		</div>
	);
}

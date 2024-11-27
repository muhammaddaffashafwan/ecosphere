import styles from "./login.module.css";
import { useState } from "react";
import axios from "axios";

export function Login() {
	const [loginData, setLoginData] = useState({
		name: "",
		password: ""
	});

	const handleChange = (e) => {
		setLoginData({
			...loginData,
			[e.target.id]: e.target.value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.post("http://localhost:5000/login", loginData)
			.then((response) => {
				localStorage.setItem("token", response.data.token);

				window.location.href = "/homepage";
			})
			.catch((error) => {
				alert(error.response.data.error);
			});
	};

	return (
		<>
			<div className={styles["body-login"]}>
				<div className={styles["content-spacing"]}></div>
				<div className={styles["container-login"]}>
					<div className={styles["image-section"]}></div>
					<div className={styles["login-section"]}>
						<h2>LOGIN</h2>
						<form onSubmit={handleSubmit}>
							<div className={styles["form-group"]}>
								<label htmlFor="username">Username</label>
								<input onChange={handleChange} type="text" id="name" placeholder="Enter Your Username" />
							</div>
							<div className={styles["form-group"]}>
								<label htmlFor="password">Password</label>
								<input onChange={handleChange} type="password" id="password" placeholder="Enter Your Password" />
							</div>
							<a href="/forgotpassword" className={styles["forgot-password"]}>
								Forgot Password?
							</a>
							<button type="submit" className={styles["login-button-main"]}>
								LOGIN
							</button>
						</form>
						<div className={styles["signup"]}>
							Don&apos;t have an account? <a href="/Signup">Sign Up Now</a>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
import "./signup.css";
import axios from "axios";
import { useEffect, useState } from "react";

export function Signup() {
	const [signupData, setSignupData] = useState({
		email: "",
		username: "",
		password: "",
		confirmPassword: ""
	});

	const handleChange = (e) => {
		setSignupData({
			...signupData,
			[e.target.id]: e.target.value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (signupData.password !== signupData.confirmPassword) {
			alert("Passwords do not match!");
			return;
		}

		axios
			.post("http://localhost:5000/signup", signupData)
			.then((response) => {
				localStorage.setItem("token", response.data.token);
        
				window.location.href = "/login";
			})
			.catch((error) => {
				alert(error.response?.data?.error || "An error occurred");
			});
	};

	useEffect(() => {
		if (signupData.password !== signupData.confirmPassword) {
			console.log("Passwords do not match!");
		} else {
			console.log("Passwords match!");
		}
	}, [signupData.password, signupData.confirmPassword]);

	return (
		<>
			<div className="body-signup">
				<div className="content-spacing"></div>

				<div className="container-signup">
					<div className="image-section-signup"> </div>

					<div className="login-section-3">
						<h2>SIGN UP</h2>
						<form onSubmit={handleSubmit}>
							<div className="form-group-1">
								<label htmlFor="email">Email</label>
								<input onChange={handleChange} type="email" id="email" placeholder="Enter Your Email" />
							</div>
							<div className="form-group-1">
								<label htmlFor="username">Username</label>
								<input onChange={handleChange} type="text" id="username" placeholder="Enter Your Username" />
							</div>
							<div className="form-group-1">
								<label htmlFor="password">Password</label>
								<input onChange={handleChange} type="password" id="password" placeholder="Enter Your Password" />
							</div>
							<div className="form-group-1">
								<label htmlFor="confirmPassword">Confirm Password</label>
								<input onChange={handleChange} type="password" id="confirmPassword" placeholder="Confirm Your Password" />
							</div>
							<button type="submit" className="login-button-main-up">
								SIGN UP
							</button>
						</form>
						<div className="signup">
							Already have an account? <a href="/Login">Login</a>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

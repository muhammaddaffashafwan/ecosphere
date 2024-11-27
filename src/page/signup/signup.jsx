import "./signup.css";
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

	// useEffect(() => {
	// 	if (password !== confirmPassword) {
	// 		console.log("Passwords do not match!");
	// 	} else {
	// 		console.log("Passwords match!");
	// 	}
	// }, [password, confirmPassword]);

	return (
		<>
			<div className="body-signup">
				<div className="content-spacing"></div>

				<div className="container-signup">
					<div className="image-section-signup"> </div>

					<div className="login-section-3">
						<h2>SIGN UP</h2>
						<form>
							<div className="form-group-1">
								<label htmlFor="email">Email</label>
								<input onChange={handleChange} type="text" id="email" placeholder="Enter Your Email" />
							</div>
							<div className="form-group-1">
								<label htmlFor="username">Username</label>
								<input onChange={handleChange} type="text" id="username" placeholder="Enter Your Username" />
							</div>
							<div className="form-group-1">
								<label htmlFor="password">Password</label>
								<input onChange={handleChange} type="text" id="password" placeholder="Enter Your Password" />
							</div>
							<div className="form-group-1">
								<label htmlFor="password">Confirm Password</label>
								<input onChange={handleChange} type="text" id="confirm-password" placeholder="Confirm Your Password" />
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

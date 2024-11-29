import "./forgotpassword.css";

export function ForgotPassword() {
	return <>
<div className="body-forgotpw">
    <div className="content-spacing"> </div>
    <div className="container-forgot">
        <div className="image-section-password"> </div>
        <div className="forgot-section">
            <h2>
                FORGOT <br /> PASSWORD?
            </h2>
            <form>
                <p>
                Enter your new password and repeat it to reset your account password.
                </p>
                <div className="form-group">
                <label htmlFor="new-password">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        placeholder="Enter Your New Password"
                    />
                </div>
                <div className="form-group">
                <label htmlFor="repeat-newPassword">Repeat New Password</label>
                    <input
                        type="password"
                        id="repeat-password"
                        placeholder="Repeat Your New Password"
                    />
                </div>
                <button type="submit" className="login-button-main">
                    SUBMIT
                </button>
            </form>
        </div>
    </div>
</div>

  </>;
}

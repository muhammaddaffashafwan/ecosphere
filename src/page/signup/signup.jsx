import "./signup.css"


export function Signup () {
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
            <label for="username">Username</label>
            <input type="text" id="username" placeholder="Enter Your Email" />
          </div>
          <div className="form-group-1">
            <label for="password">Password</label>
            <input type="password" id="password" placeholder="Enter Your Password" />
          </div>
          <div className="form-group-1">
            <label for="password">Confirm Password</label>
            <input type="password" id="password" placeholder="Confirm Your Password" />
          </div>
          <button type="submit" className="login-button-main-up">SIGN UP</button>
        </form>
        <div className="signup">Already have an account? <a href="/Login">Login</a></div>
      </div>
    </div>
    </div></>
    )
}

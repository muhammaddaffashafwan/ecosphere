import "./forgotpw.css"

export function Forgotpw () {
    return (
        <>  
    <div className="content-spacing"></div>

    <div className="container-forgot">
      
      <div className="image-section">
        
      </div>

     
      <div className="login-section-2">
        <h2>FORGOT <br />PASSWORD?</h2>
        <form>
          <p>Enter your email address or username which is connected to your account for receive an email from us</p>
          <div className="form-group">
            <input type="password" id="password" placeholder="Enter Your New Password" />
          </div>
          <div className="form-group">
            <input type="password" id="password" placeholder="Repeat Your New Password" />
          </div>
          <button type="submit" className="login-button-main">SUBMIT</button>
        </form>
      </div>
    </div> 
    </>
    )
}
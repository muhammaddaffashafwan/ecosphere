import styles from './login.module.css';
export function Login() {
    
    return (
        <>
        <div className={styles['body-login']}>
            <div className={styles['content-spacing']}></div>
            <div className={styles['container-login']}> 
                <div className={styles['image-section']}></div>
                <div className={styles['login-section']}>
                    <h2>LOGIN</h2>
                    <form>
                        <div className={styles['form-group']}>
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" placeholder="Enter Your Username" />
                        </div>
                        <div className={styles['form-group']}>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder="Enter Your Password" />
                        </div>
                        <a href="/forgotpassword" className={styles['forgot-password']}>Forgot Password?</a>
                        <button type="submit" className={styles['login-button-main']}>LOGIN</button>
                    </form>
                    <div className={styles['signup']}>
                        Don&apos;t have an account? <a href="/Signup">Sign Up Now</a>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

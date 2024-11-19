import "./navbar.css";
import { Link } from "react-router-dom";
export function Navbar() {
  return (
    <>
      <header className='header'>
        <div className='logo'>
          <img src='/images/logo.jpg' alt='Logo' />
        </div>
        <nav className='nav'>
          <Link to='/inspiration'>INSPIRATION</Link>
          <Link to='/property'>PROPERTY</Link>
          <Link to='/article1'>ARTICLE</Link>
          <Link to='/forum1'>FORUM</Link>
          <Link to='/login' className='login-button'>
            LOG IN
          </Link>
        </nav>
      </header>
    </>
  );
}

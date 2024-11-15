import "./navbar.css"
import { Link } from "react-router-dom"
export function Navbar () {
    return (
        <>
        <header className="header">
          <div className="logo">
            <img src="/images/logo.jpg" alt="Logo" />
          </div>
          <nav className="nav">
            <Link to ='/inspiration'>INSPIRATION</Link>
            <a href="#properti">PROPERTY</a>
            <Link to ='/article2'>ARTICLE</Link>
            <a href="#artikel">FORUM</a>
            <a href="#login" className="login-button">
              LOG IN
            </a>
          </nav>
        </header>
        </>
    )
}
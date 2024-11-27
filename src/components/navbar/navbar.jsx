import { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

export function Navbar() {
  // State untuk mengontrol dropdown menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // State untuk mengecek apakah user sudah login
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Fungsi untuk toggle menu dropdown
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <Link to="/"> <img src="/images/logo.jpg" alt="Logo" className="w-60" /> </Link>
        </div>
        <nav className="nav">
          <div className="container mx-auto flex justify-between items-center px-6 py-4">
            {/* Desktop Menu */}
            <div className="hidden md:flex gap-[70px] items-center justify-center">
              <Link to="/inspiration" className="text-lg text-gray-700 hover:text-[#5c7838]">
                INSPIRATION
              </Link>
              <Link to="/property" className="text-lg text-gray-700 hover:text-[#5c7838]">
                PROPERTY
              </Link>
              <Link to="/article1" className="text-lg text-gray-700 hover:text-[#5c7838]">
                ARTICLE
              </Link>

              {/* Conditional rendering for 'Forum' and 'Login/Profile' */}
              {isLoggedIn ? (
                <Link to="/forum1" className="text-lg text-gray-700 hover:text-[#5c7838]">
                  FORUM
                </Link>
              ) : null}

              {/* Profile or Login button */}
              {isLoggedIn ? (
                <Link to="/profile" className="px-4 py-2  text-white rounded-full">
                  <img src="/images/profil.jpg" alt="" />
                </Link>
              ) : (
                <Link to="/login" className="px-4 py-2 bg-[#5c7838] text-white rounded-full">
                  LOG IN
                </Link>
              )}
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-[#5c7838]">
                MORE
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48">
                  <Link
                    to="/inspiration"
                    className="block px-4 py-2 text-gray-700 hover:bg-[#c9dbb2]"
                    onClick={() => setIsMenuOpen(false)} // Menutup menu setelah link diklik
                  >
                    INSPIRATION
                  </Link>
                  <Link
                    to="/property"
                    className="block px-4 py-2 text-gray-700 hover:bg-[#c9dbb2]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    PROPERTY
                  </Link>
                  <Link
                    to="/article1"
                    className="block px-4 py-2 text-gray-700 hover:bg-[#c9dbb2]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    ARTICLE
                  </Link>

                  {/* Conditional rendering for 'Forum' and 'Login/Profile' */}
                  {isLoggedIn ? (
                    <Link
                      to="/forum1"
                      className="block px-4 py-2 text-gray-700 hover:bg-[#c9dbb2]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      FORUM
                    </Link>
                  ) : null}

                  {isLoggedIn ? (
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-[#c9dbb2]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      PROFILE
                    </Link>
                  ) : (
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-gray-700 hover:bg-[#c9dbb2]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      LOG IN
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

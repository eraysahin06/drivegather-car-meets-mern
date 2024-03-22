import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "../../../hooks/useAuth";
import logo from "../../../assets/drive-gather-logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useAuth();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("User signed out");
        navigate("/register");
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed w-full top-0 z-10 transition-colors duration-300 ${
        isScrolled ? "bg-white" : "bg-white"
      } text-black px-4 py-2 shadow-md`}
    >
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link
          to="/"
          className="text-2xl font-bold flex items-center justify-center"
          onClick={closeMenu}
        >
          <img src={logo} alt="Drive Gather Logo" className="h-10" />
        </Link>
        <div className="hidden md:flex space-x-4 items-center">
          <Link to="/" className="hover:text-gray-600" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-600" onClick={closeMenu}>
            About
          </Link>
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center hover:bg-gray-200 text-black font-bold py-1 px-3 rounded ml-2"
              >
                <FaUserCircle size={24} />
                <span className="ml-2">{user.displayName || "User"}</span>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg py-1">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={closeMenu}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 hover:bg-red-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                onClick={closeMenu}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                onClick={closeMenu}
              >
                Register
              </Link>
            </>
          )}
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white bg-opacity-95 py-2 shadow-md">
          <Link
            to="/"
            className="block px-4 py-2 hover:text-gray-600"
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block px-4 py-2 hover:text-gray-600"
            onClick={closeMenu}
          >
            About
          </Link>
          {user ? (
            <>
              <Link
                to="/profile"
                className="block px-4 py-2 bg-black hover:bg-gray-900 text-white font-bold rounded"
                onClick={closeMenu}
              >
                Profile
              </Link>
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 bg-red-600 hover:bg-red-800 text-white font-bold rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white font-bold rounded"
                onClick={closeMenu}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="block px-4 py-2 bg-green-600 hover:bg-green-800 text-white font-bold rounded"
                onClick={closeMenu}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
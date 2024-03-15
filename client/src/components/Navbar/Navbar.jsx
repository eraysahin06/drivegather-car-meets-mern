import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useAuth();

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-2">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Car Meets
        </Link>
        <div className="hidden md:flex space-x-4 items-center">
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link to="/about" className="hover:text-gray-400">
            About
          </Link>
          <Link to="/contact" className="hover:text-gray-400">
            Contact
          </Link>
          {user ? (
            <>
              <span>{user.displayName || "User"}</span>
              {user.photoURL && (
                <img
                  className="w-8 h-8 rounded-full ml-2"
                  src={user.photoURL}
                  alt="Profile"
                />
              )}
              <button
                onClick={handleSignOut}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded ml-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
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
        <div className="md:hidden bg-gray-900 bg-opacity-50 py-2">
          <Link to="/" className="block px-4 py-2 hover:text-gray-400">
            Home
          </Link>
          <Link to="/about" className="block px-4 py-2 hover:text-gray-400">
            About
          </Link>
          <Link to="/contact" className="block px-4 py-2 hover:text-gray-400">
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

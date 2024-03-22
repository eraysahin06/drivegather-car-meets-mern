import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const MobileMenu = ({ user, closeMenu, handleSignOut, isScrolled }) => {
    return (
        <div
          className={`md:hidden font-semibold py-4 shadow-md text-black space-y-2 ${
            isScrolled ? "bg-white p-4" : "bg-opacity-95"
          }`}
        >
          <Link
            to="/"
            className="block p-4 border-2 border-black hover:bg-gray-100 rounded-md"
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block p-4 border-2 border-black hover:bg-gray-100 rounded-md"
            onClick={closeMenu}
          >
            About
          </Link>
          {user ? (
            <>
              <Link
                to="/profile"
                className="block px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-md"
                onClick={closeMenu}
              >
                Profile
              </Link>
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-3 bg-red-700 hover:bg-red-600 text-white font-bold rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-4 py-3 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded-md"
                onClick={closeMenu}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="block px-4 py-3 bg-green-700 hover:bg-green-600 text-white font-bold rounded-md"
                onClick={closeMenu}
              >
                Register
              </Link>
            </>
          )}
        </div>
      );
};

MobileMenu.propTypes = {
  user: PropTypes.object,
  closeMenu: PropTypes.func.isRequired,
  handleSignOut: PropTypes.func.isRequired,
  isScrolled: PropTypes.bool,
};

export default MobileMenu;

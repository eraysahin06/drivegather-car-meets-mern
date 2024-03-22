import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const MobileMenu = ({ user, closeMenu, handleSignOut }) => {
  return (
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
  );
};

MobileMenu.propTypes = {
  user: PropTypes.object,
  closeMenu: PropTypes.func.isRequired,
  handleSignOut: PropTypes.func.isRequired,
};

export default MobileMenu;

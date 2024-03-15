import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white px-4 py-2">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">Car Meets</div>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="hover:text-gray-400">Home</Link>
          <Link to="/about" className="hover:text-gray-400">About</Link>
          <Link to="/contact" className="hover:text-gray-400">Contact</Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 bg-opacity-50 py-2">
          <Link to="/" className="block px-4 py-2 hover:text-gray-400">Home</Link>
          <Link to="/about" className="block px-4 py-2 hover:text-gray-400">About</Link>
          <Link to="/contact" className="block px-4 py-2 hover:text-gray-400">Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from '../image/logo.png';
import { FaUserCircle } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import Cart from './Cart';

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token); // You must install jwt-decode
        setUser(decoded);
      } catch (err) {
        console.error("Invalid token", err);
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setDropdownOpen(false); // Close the dropdown
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="font-sans">
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-10 h-10" />
          <span className="text-xl font-semibold">Green Farming</span>
        </div>
         
        {/* Nav Menu */}
        <nav className="space-x-6 md:block">
          <Link to="/" className="text-green-700 font-medium hover:underline">Home</Link>
          <Link to="/dashboard" className="text-green-700 font-medium hover:underline">Dashboard</Link>
          <Link to="/bookings" className="text-green-700 font-medium hover:underline">Bookings</Link>

          {/* Show Add Product only for users with 'admin' role */}
          {user && user.role === 'admin' && (
            <Link to="/add-product" className="text-green-700 font-medium hover:underline">Add Product</Link>
          )}

          <Link to="/help" className="text-green-700 font-medium hover:underline">Help</Link>
          <Link to="/contact" className="text-green-700 font-medium hover:underline">Contact Us</Link>
          <Link to="/contact" className="text-green-700 font-medium hover:underline"></Link>
        </nav>

        {/* Right Side Buttons */}
        <div className="relative">
          {!user ? (
            <div className="space-x-2">
              <button
                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
              <button
                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                onClick={() => navigate('/register')}
              >
                Sign Up
              </button>
              <button
                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                onClick={() => navigate('/register')}
              >
                
              </button>
            </div>
          ) : (
            <div className="relative">
              <FaUserCircle className="text-3xl text-green-700 cursor-pointer" onClick={toggleDropdown} />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md p-2 z-50">
                  <p className="text-gray-800 text-sm font-medium">{user.email}</p>
                  <p className="text-gray-500 text-xs capitalize">{user.role}</p>
                  <hr className="my-2" />
                  <button
                    className="text-red-600 text-sm hover:underline"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default Navbar;

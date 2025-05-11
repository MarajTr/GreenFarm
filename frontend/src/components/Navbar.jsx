import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from '../image/logo.png';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import Cart from './Cart';

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        // Only load cart for logged in user
        const savedCart = localStorage.getItem(`cart_${decoded._id}`);
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      } catch (err) {
        console.error("Invalid token", err);
        setUser(null);
        setCartItems([]);
      }
    }
  }, []);

  // Add storage event listener
  useEffect(() => {
    const handleCartUpdate = (e) => {
      setCartItems(e.detail.items);
    };

    const handleStorageChange = (e) => {
      if (e.key === 'cart') {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        } else {
          setCartItems([]);
        }
      }
    };

    // Load initial cart data
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    // Add event listeners
    window.addEventListener('cartUpdate', handleCartUpdate);
    window.addEventListener('storage', handleStorageChange);

    // Cleanup
    return () => {
      window.removeEventListener('cartUpdate', handleCartUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const addToCart = (item) => {
    const newCartItems = [...cartItems, item];
    setCartItems(newCartItems);
    localStorage.setItem('cart', JSON.stringify(newCartItems));
  };

  const removeFromCart = (itemId) => {
    const newCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(newCartItems);
    localStorage.setItem('cart', JSON.stringify(newCartItems));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const handleLogout = () => {
    if (user) {
      localStorage.removeItem(`cart_${user._id}`); // Clear user-specific cart
    }
    localStorage.removeItem('token');
    setUser(null);
    setCartItems([]);
    setDropdownOpen(false);
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="font-sans">
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-10 h-10" />
          <span className="text-xl font-semibold">Green Farming</span>
        </div>
         
        {/* Nav Menu */}
        <nav className="space-x-6 md:block">
          <Link to="/" className="text-green-700 font-medium hover:underline">Home</Link>
          <Link to="/dashboard" className="text-green-700 font-medium hover:underline">Dashboard</Link>
          <Link to="/bookings" className="text-green-700 font-medium hover:underline">Bookings</Link>
          {user && user.role === 'admin' && (
            <Link to="/add-product" className="text-green-700 font-medium hover:underline">Add Product</Link>
          )}
          <Link to="/help" className="text-green-700 font-medium hover:underline">Help</Link>
          <Link to="/contact" className="text-green-700 font-medium hover:underline">Contact Us</Link>
        </nav>

        {/* Right Side Buttons */}
        <div className="flex items-center space-x-4">
          {/* Only show cart for logged in users */}
          {user && (
            <button className="relative" onClick={toggleCart}>
              <FaShoppingCart className="text-2xl text-green-700 hover:text-green-800" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems.length}
                </span>
              )}
            </button>
          )}

          {/* User Section */}
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
            </div>
          ) : (
            <div className="relative">
              <FaUserCircle 
                className="text-3xl text-green-700 cursor-pointer" 
                onClick={toggleDropdown} 
              />
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

      {/* Only render Cart component for logged in users */}
      {user && (
        <Cart 
          open={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onRemoveItem={removeFromCart}
          onClearCart={clearCart}
          userId={user._id}
        />
      )}
    </div>
  );
}

export default Navbar;

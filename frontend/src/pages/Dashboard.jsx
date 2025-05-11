import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Grid,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import Navbar from '../components/Navbar';
import EquipmentCard from '../components/EquipmentCard';
import SearchBar from '../components/SearchBar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Cart from '../components/Cart';

const Dashboard = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [equipmentData, setEquipmentData] = useState([]);
  const [filteredEquipment, setFilteredEquipment] = useState([]);
  const [category, setCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/auth/dashproducts', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // ✅ Save data to state
      setEquipmentData(response.data);
      setFilteredEquipment(response.data); // Initialize filtered list
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

const deleteItem = async (id) => {
  setLoading(true);
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:3000/auth/dashproducts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Remove the item from the cart
    setCartItems(prev => prev.filter(item => item._id !== id)); // Update to match id
    setSuccess('Item removed from cart and database successfully!');
  } catch (err) {
    setError('Failed to remove item from cart');
  } finally {
    setLoading(false);
  }
};


  const handleRentClick = (equipment) => {
    setLoading(true);
    setTimeout(() => {
      setCartItems(prev => [...prev, equipment]);
      setSuccess(`${equipment.name} added to cart successfully!`);
      setLoading(false);
    }, 1000);
  };

  const handleRemoveFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item._id !== itemId));
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleSearch = (searchTerm) => {
    filterEquipment(searchTerm, category, priceRange, showOnlyAvailable);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    filterEquipment('', newCategory, priceRange, showOnlyAvailable);
  };

  const handlePriceChange = (range) => {
    setPriceRange(range);
    filterEquipment('', category, range, showOnlyAvailable);
  };

  const handleAvailabilityChange = (checked) => {
    setShowOnlyAvailable(checked);
    filterEquipment('', category, priceRange, checked);
  };

  const filterEquipment = (searchTerm, cat, price, onlyAvailable) => {
    const filtered = equipmentData.filter(item => {
      const matchesSearch =
        !searchTerm ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = cat === 'all' || item.category === cat;

      const itemPrice = parseInt(item.price.replace('/day', ''));
      const matchesPrice = itemPrice >= price[0] && itemPrice <= price[1];

      const matchesAvailability = !onlyAvailable || item.status === 'Available';

      return matchesSearch && matchesCategory && matchesPrice && matchesAvailability;
    });

    setFilteredEquipment(filtered);
  };

  return (
    <Box className="min-h-screen flex flex-col bg-gray-50">
      <Navbar cartItems={cartItems.length} onCartClick={handleCartClick} />

      <Container maxWidth="xl" className="mt-8 flex-grow">
        <Box className="flex gap-8">
          {/* Sidebar */}
          <Box className="hidden md:block w-64 flex-shrink-0">
            <Sidebar
              category={category}
              priceRange={priceRange}
              showOnlyAvailable={showOnlyAvailable}
              onPriceChange={handlePriceChange}
              onAvailabilityChange={handleAvailabilityChange}
              onCategoryChange={handleCategoryChange}
            />
          </Box>

          {/* Main Content */}
          <Box className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <Typography variant="h4" className="text-gray-800 font-bold">
                Available Equipment
              </Typography>
              {loading && <CircularProgress size={24} className="text-green-600" />}
            </div>

            <SearchBar onSearch={handleSearch} className="mb-6" />

            {error && (
              <Alert severity="error" className="mb-4">
                {error}
              </Alert>
            )}

            <Grid container spacing={4}>
              {filteredEquipment.map((equipment) => (
                <Grid item xs={12} sm={6} lg={4} key={equipment._id}>
                  <EquipmentCard
                    equipment={equipment}
                    onRentClick={() => handleRentClick(equipment)}
                    loading={loading}
                  />
                </Grid>
              ))}
            </Grid>

            {filteredEquipment.length === 0 && !loading && (
              <Box className="text-center py-12">
                <Typography className="text-gray-600 text-lg">
                  No equipment found matching your criteria.
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Container>

      <Cart
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
      />

      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="success" variant="filled">
          {success}
        </Alert>
      </Snackbar>

      <Footer />
    </Box>
  );
};

export default Dashboard;

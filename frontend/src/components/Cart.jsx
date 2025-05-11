import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

const Cart = ({ open, onClose, cartItems, onRemoveItem, onClearCart }) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [checkoutDetails, setCheckoutDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const totalAmount = cartItems.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/[^\d]/g, ''));
    return sum + price;
  }, 0);

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleConfirmCheckout = () => {
    console.log('Checkout Details:', {
      items: cartItems,
      total: totalAmount,
      ...checkoutDetails
    });
    
    setShowSuccess(true);
    
    setTimeout(() => {
      onClearCart();
      setCheckoutDetails({
        name: '',
        email: '',
        phone: '',
        address: ''
      });
      setShowCheckout(false);
      setShowSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <>
      <Drawer anchor="right" open={open} onClose={onClose}>
        <Box className="w-80 p-4">
          <Box className="flex justify-between items-center mb-4">
            <Typography variant="h6">Your Cart</Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          {cartItems.length === 0 ? (
            <Typography className="text-gray-500 text-center py-8">
              Your cart is empty
            </Typography>
          ) : (
            <>
              <List>
                {cartItems.map((item) => (
                  <ListItem key={item.id}>
                    <ListItemText
                      primary={item.name}
                      secondary={`৳${item.price}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton 
                        edge="end" 
                        onClick={() => onRemoveItem(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>

              <Box className="mt-4 pt-4 border-t">
                <Typography variant="h6" className="mb-4">
                  Total: ৳{totalAmount}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  className="bg-green-600 hover:bg-green-700"
                  onClick={handleCheckout}
                >
                  PROCEED TO CHECKOUT
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Drawer>

      <Dialog open={showCheckout} onClose={() => setShowCheckout(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Checkout Details</DialogTitle>
        <DialogContent>
          <Box className="space-y-4 mt-2">
            <TextField
              fullWidth
              label="Full Name"
              value={checkoutDetails.name}
              onChange={(e) => setCheckoutDetails({
                ...checkoutDetails,
                name: e.target.value
              })}
              required
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={checkoutDetails.email}
              onChange={(e) => setCheckoutDetails({
                ...checkoutDetails,
                email: e.target.value
              })}
              required
            />
            <TextField
              fullWidth
              label="Phone Number"
              value={checkoutDetails.phone}
              onChange={(e) => setCheckoutDetails({
                ...checkoutDetails,
                phone: e.target.value
              })}
              required
            />
            <TextField
              fullWidth
              label="Delivery Address"
              multiline
              rows={3}
              value={checkoutDetails.address}
              onChange={(e) => setCheckoutDetails({
                ...checkoutDetails,
                address: e.target.value
              })}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions className="p-4">
          <Button onClick={() => setShowCheckout(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            className="bg-green-600 hover:bg-green-700"
            onClick={handleConfirmCheckout}
            disabled={!Object.values(checkoutDetails).every(Boolean)}
          >
            Confirm Order
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={showSuccess}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled">
          Order confirmed successfully! We'll contact you shortly.
        </Alert>
      </Snackbar>
    </>
  );
};

export default Cart;
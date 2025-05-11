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

const Cart = ({ open, onClose, items = [], onRemoveItem, onClearCart }) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [checkoutDetails, setCheckoutDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  // Safe price calculation with error handling
  const totalAmount = items.reduce((sum, item) => {
    try {
      const price = typeof item.price === 'string' 
        ? parseInt(item.price.replace(/[^\d]/g, '')) 
        : item.price;
      return sum + (isNaN(price) ? 0 : price);
    } catch (error) {
      console.error('Error calculating price for item:', item);
      return sum;
    }
  }, 0);

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleConfirmCheckout = () => {
    // Validate checkout details
    if (!Object.values(checkoutDetails).every(Boolean)) {
      return;
    }

    // Process checkout
    console.log('Processing order:', {
      items,
      total: totalAmount,
      ...checkoutDetails
    });

    setShowSuccess(true);

    // Clear cart and reset form
    setTimeout(() => {
      setCheckoutDetails({
        name: '',
        email: '',
        phone: '',
        address: ''
      });
      setShowCheckout(false);
      setShowSuccess(false);
      onClose();
      // Clear the cart
      onClearCart();
      localStorage.removeItem('cart');
    }, 2000);
  };

  return (
    <>
      <Drawer 
        anchor="right" 
        open={open} 
        onClose={onClose}
      >
        <Box sx={{ width: { xs: 300, sm: 400 } }} className="p-4">
          <Box className="flex justify-between items-center mb-4">
            <Typography variant="h6">Shopping Cart</Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          {!items?.length ? (
            <Typography className="text-gray-500 text-center py-8">
              Your cart is empty
            </Typography>
          ) : (
            <>
              <List className="max-h-[60vh] overflow-y-auto">
                {items.map((item) => (
                  <ListItem key={item.id} className="border-b">
                    <ListItemText
                      primary={item.name}
                      secondary={
                        <React.Fragment>
                          <Typography component="span" variant="body2">
                            Price: ৳{item.price}
                          </Typography>
                          {item.description && (
                            <>
                              <br />
                              <Typography component="span" variant="body2">
                                {item.description}
                              </Typography>
                            </>
                          )}
                        </React.Fragment>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton 
                        edge="end" 
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-500"
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
                  Proceed to Checkout
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Drawer>

      <Dialog 
        open={showCheckout} 
        onClose={() => setShowCheckout(false)} 
        maxWidth="sm" 
        fullWidth
      >
        <DialogTitle>Checkout Details</DialogTitle>
        <DialogContent>
          <Box className="space-y-4 mt-2">
            <TextField
              fullWidth
              label="Full Name"
              value={checkoutDetails.name}
              onChange={(e) => setCheckoutDetails(prev => ({
                ...prev,
                name: e.target.value
              }))}
              required
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={checkoutDetails.email}
              onChange={(e) => setCheckoutDetails(prev => ({
                ...prev,
                email: e.target.value
              }))}
              required
            />
            <TextField
              fullWidth
              label="Phone Number"
              value={checkoutDetails.phone}
              onChange={(e) => setCheckoutDetails(prev => ({
                ...prev,
                phone: e.target.value
              }))}
              required
            />
            <TextField
              fullWidth
              label="Delivery Address"
              multiline
              rows={3}
              value={checkoutDetails.address}
              onChange={(e) => setCheckoutDetails(prev => ({
                ...prev,
                address: e.target.value
              }))}
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
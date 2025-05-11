import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Container,
  Typography,
  Box
} from '@mui/material';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: 'tractor',
    image: '', // this is where the image URL will be stored
    status: 'Available'
  });

  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'form_img');

    try {
      setUploading(true); // To show the uploading state
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dqlkmngsz/image/upload',
        formData
      );

      
      setFormData((prev) => ({
        ...prev,
        image: response.data.secure_url 
      }));

      console.log('Image uploaded:', response.data.secure_url);
      setUploading(false); // Stop showing uploading state
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Image upload failed.');
      setUploading(false); // Stop showing uploading state
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in as an admin to add products.');
      return;
    }

    const newProduct = {
      ...formData,
      price: `${formData.price}/day`
    };

    try {
      const response = await axios.post(
        'http://localhost:3000/auth/products',
        newProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert('Product added successfully!');
      console.log('Server response:', response.data);

      // Reset form
      setFormData({
        name: '',
        price: '',
        description: '',
        category: 'tractor',
        image: '',
        status: 'Available'
      });
    } catch (error) {
      console.error('Error adding product:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Failed to add product.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h5" gutterBottom>Add New Equipment</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            label="Daily Price"
            type="number"
            fullWidth
            margin="normal"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <MenuItem value="tractor">Tractor</MenuItem>
              <MenuItem value="harvester">Harvester</MenuItem>
              <MenuItem value="cultivator">Cultivator</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            component="label"
            fullWidth
            style={{ marginTop: 16 }}
          >
            {uploading ? 'Uploading Image...' : 'Upload Image'}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageUpload}
            />
          </Button>

          {formData.image && (
            <Box mt={2}>
              <Typography variant="subtitle1">Preview:</Typography>
              <img src={formData.image} alt="Uploaded" width="100%" style={{ borderRadius: 8 }} />
            </Box>
          )}

          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <MenuItem value="Available">Available</MenuItem>
              <MenuItem value="Not Available">Not Available</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            disabled={uploading}
            style={{ marginTop: 16 }}
          >
            Add Equipment
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddProduct;

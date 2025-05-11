import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import EquipmentDetails from './EquipmentDetails';

const EquipmentCard = ({ equipment, onRentClick }) => {
  const [imageError, setImageError] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      <Card 
        className="h-full flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => setShowDetails(true)}
      >
        <CardMedia
          component="img"
          height="200"
          image={imageError ? '/placeholder.jpg' : equipment.image}
          alt={equipment.name}
          onError={handleImageError}
          className="h-48 object-cover"
        />
        <CardContent className="flex-grow">
          <Typography variant="h6" component="h2">
            {equipment.name}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            {equipment.description}
          </Typography>
          <Typography className="text-green-600 font-bold">
            Price: ৳{equipment.price}
          </Typography>
          <Typography className={`${
            equipment.status === 'Available' ? 'text-green-600' : 'text-red-600'
          }`}>
            Status: {equipment.status}
          </Typography>
          <Button
            variant="contained"
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click when clicking button
              onRentClick(equipment);
            }}
            className="mt-4 bg-green-600 hover:bg-green-700"
            fullWidth
          >
            RENT NOW
          </Button>
        </CardContent>
      </Card>

      <EquipmentDetails 
        open={showDetails}
        onClose={() => setShowDetails(false)}
        equipment={equipment}
      />
    </>
  );
};

export default EquipmentCard;
import React from 'react';
import { Card, CardContent, Typography, CardMedia, Button, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { addFavorite, removeFavorite } from '../../../slices/favoritesSlice';
import { DogModel } from '../../../types';

interface DogCardProps {
  dog: DogModel;
}

const DogCard: React.FC<DogCardProps> = ({ dog }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.dogIds);
  const isFavorite = favorites.includes(dog.id);

  const handleFavorite = () => {
    isFavorite ? dispatch(removeFavorite(dog.id)) : dispatch(addFavorite(dog.id));
  };

  return (
    <Card sx={{ maxWidth: 300, m: 2, mx: 'auto' }}>
      <CardMedia component="img" height="200" image={dog.img} alt={dog.name} />
      <CardContent>
        <Typography variant="h6" noWrap>{dog.name}</Typography>
        <Typography variant="body2">Breed: {dog.breed}</Typography>
        <Typography variant="body2">Age: {dog.age}</Typography>
        <Typography variant="body2">Zip Code: {dog.zip_code}</Typography>
        <Box sx={{ mt: 1 }}>
          <Button
            variant="contained"
            color={isFavorite ? 'secondary' : 'primary'}
            fullWidth
            onClick={handleFavorite}
          >
            {isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
          </Button>
        </Box>
      </CardContent>
    </Card>

  );
};

export default DogCard;

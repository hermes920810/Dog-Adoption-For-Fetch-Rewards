import React from 'react';
import { Button, Card, CardContent, Typography, CardMedia, Box, Alert, CircularProgress } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation, useQuery } from 'react-query';
import { RootState } from '../../../store';
import { getDogMatch, fetchDogsByIds } from '../../../services';
import { clearFavorites } from '../../../slices/favoritesSlice';
import { DogModel } from '../../../types';

const MatchResult: React.FC = () => {
  const favoriteDogIds = useSelector((state: RootState) => state.favorites.dogIds);
  const dispatch = useDispatch();

  // Mutation for getting the match
  const matchMutation = useMutation({
    mutationFn: () => getDogMatch(favoriteDogIds),
  });

  // Query for fetching matched dog details
  const matchedDogQuery = useQuery<DogModel[], Error>({
    queryKey: ['matchedDog', matchMutation.data?.match],
    queryFn: () => fetchDogsByIds([matchMutation.data!.match]),
    enabled: !!matchMutation.data?.match, // Run only when match exists
  });

  const handleFindMatch = () => {
    matchMutation.mutate();
  };

  const handleClearFavorites = () => {
    dispatch(clearFavorites());
    matchMutation.reset(); // Clear mutation state
  };

  if (favoriteDogIds.length === 0) {
    return <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>No favorites selected.</Typography>;
  }

  return (
    <Box sx={{ mt: 4, textAlign: 'center' }}>
      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          onClick={handleFindMatch}
          disabled={matchMutation.isLoading || matchedDogQuery.isFetching}
        >
          {matchMutation.isLoading ? <CircularProgress size={24} color="inherit" /> : 'Find My Match'}
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          sx={{ mx: 2 }}
          onClick={handleClearFavorites}
          disabled={matchMutation.isLoading || matchedDogQuery.isFetching}
        >
          Clear Favorites
        </Button>
      </Box>

      {matchedDogQuery.isLoading && <CircularProgress sx={{ mt: 2 }} />}
      {matchedDogQuery.isError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Failed to load matched dog. Please try again.
        </Alert>
      )}

      {matchedDogQuery.data && matchedDogQuery.data[0] && (
        <Card sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
          <CardMedia component="img" height="300" image={matchedDogQuery.data[0].img} alt={matchedDogQuery.data[0].name} />
          <CardContent>
            <Typography variant="h5" gutterBottom>{matchedDogQuery.data[0].name}</Typography>
            <Typography>Breed: {matchedDogQuery.data[0].breed}</Typography>
            <Typography>Age: {matchedDogQuery.data[0].age} years</Typography>
            <Typography>Zip Code: {matchedDogQuery.data[0].zip_code}</Typography>
          </CardContent>
        </Card>
      )}

      {matchMutation.isError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Failed to find a match. Please try again.
        </Alert>
      )}
    </Box>
  );
};

export default MatchResult;

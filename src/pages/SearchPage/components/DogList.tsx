import React, { useState, useEffect } from 'react';
import { Box, MenuItem, Button, Typography, Grid, Select, FormControl, InputLabel, CircularProgress, Alert } from '@mui/material';
import { useQuery, useQueryClient } from 'react-query';
import { fetchBreeds, searchDogs, fetchDogsByIds } from '../../../services';
import DogCard from './DogCard';
import { DogModel } from '../../../types';

const DogList: React.FC = () => {
  const [selectedBreed, setSelectedBreed] = useState<string>('');
  const [pageSize, setPageSize] = useState<number>(12);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [paginationUrl, setPaginationUrl] = useState<string | null>(null); // Track next/prev URLs
  const queryClient = useQueryClient();

  // Fetch all breeds
  const { data: breeds, isLoading: breedsLoading, isError: breedsError } = useQuery(['breeds'], fetchBreeds);

  // Fetch dogs (initial load + pagination)
  const { data: searchResults, isLoading, isError } = useQuery({
    queryKey: ['dogs', selectedBreed, sortOrder, paginationUrl, pageSize],
    queryFn: () => searchDogs({ breeds: selectedBreed ? [selectedBreed] : undefined, sort: `breed:${sortOrder}`, size: pageSize }, paginationUrl || undefined),
  });

  // Fetch dog details using IDs from searchResults
  const { data: dogs, isLoading: dogsLoading, isError: dogsError } = useQuery({
    queryKey: ['dogDetails', searchResults?.resultIds],
    queryFn: () => fetchDogsByIds(searchResults?.resultIds || []),
    enabled: !!searchResults?.resultIds,
  });

  // Handle search/filter changes
  useEffect(() => {
    if (!selectedBreed && !!breeds && breeds?.length > 0) {
      setSelectedBreed(breeds[0]);
    }
  }, [selectedBreed, breeds]);

  // Handle search/filter changes
  useEffect(() => {
    setPaginationUrl(null); // Reset pagination when filters change
    queryClient.invalidateQueries(['dogs']); // Refetch data
  }, [selectedBreed, sortOrder, pageSize]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Search Dogs</Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Breed</InputLabel>
          <Select label="Breed" value={selectedBreed} onChange={(e) => setSelectedBreed(e.target.value)}>
            {breeds?.map((breed) => (
              <MenuItem key={breed} value={breed}>{breed}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Sort Order</InputLabel>
          <Select label="Sort Order" value={sortOrder} onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}>
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Items Per Page</InputLabel>
          <Select label="Items Per Page" value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
            <MenuItem value="12">12</MenuItem>
            <MenuItem value="24">24</MenuItem>
            <MenuItem value="36">36</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {isLoading || breedsLoading || dogsLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress sx={{ m: 'auto' }} />
        </Box>
      ) : isError || breedsError || dogsError ? (
        <Alert severity="error">Failed to load data. Please try again.</Alert>
      ) : (
        <Grid container spacing={2}>
          {dogs?.map((dog: DogModel) => (
            <Grid item key={dog.id} xs={12} sm={6} md={4} lg={3}>
              <DogCard dog={dog} />
            </Grid>
          ))}
        </Grid>
      )}

      <Box display="flex" justifyContent="space-between" mt="12px">
        <Button
          variant="contained"
          disabled={!searchResults?.prev}
          onClick={() => setPaginationUrl(searchResults?.prev || null)}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          disabled={!searchResults?.next}
          onClick={() => setPaginationUrl(searchResults?.next || null)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default DogList;

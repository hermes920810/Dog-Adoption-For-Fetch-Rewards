import React, { useState, useEffect } from 'react';
import {
  Box,
  MenuItem,
  Button,
  Typography,
  Grid,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  Chip,
  OutlinedInput,
  TextField
} from '@mui/material';
import { useQuery, useQueryClient } from 'react-query';
import { fetchBreeds, searchDogs, fetchDogsByIds } from '../../../services';
import DogCard from './DogCard';
import { DogModel } from '../../../types';

const DogList: React.FC = () => {
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [pageSize, setPageSize] = useState<number>(12);
  const [sortField, setSortField] = useState<string>('breed');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [ageMin, setAgeMin] = useState<number | ''>('');
  const [ageMax, setAgeMax] = useState<number | ''>('');
  const [paginationUrl, setPaginationUrl] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: breeds, isLoading: breedsLoading, isError: breedsError } = useQuery(['breeds'], fetchBreeds);

  const { data: searchResults, isLoading, isError } = useQuery({
    queryKey: ['dogs', selectedBreeds, sortField, sortOrder, paginationUrl, pageSize, ageMin, ageMax],
    queryFn: () => searchDogs({
      breeds: selectedBreeds.length ? selectedBreeds : undefined,
      sort: `${sortField}:${sortOrder}`,
      size: pageSize,
      ageMin: ageMin || undefined,
      ageMax: ageMax || undefined
    }, paginationUrl || undefined),
  });

  const { data: dogs, isLoading: dogsLoading, isError: dogsError } = useQuery({
    queryKey: ['dogDetails', searchResults?.resultIds],
    queryFn: () => fetchDogsByIds(searchResults?.resultIds || []),
    enabled: !!searchResults?.resultIds,
  });

  useEffect(() => {
    setPaginationUrl(null);
    queryClient.invalidateQueries(['dogs']);
  }, [selectedBreeds, sortField, sortOrder, pageSize, ageMin, ageMax, queryClient]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Search Dogs</Typography>
      <Box display="flex" sx={{ gap: 2, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <FormControl fullWidth>
              <InputLabel>Breeds</InputLabel>
              <Select
                multiple
                value={selectedBreeds}
                onChange={(e) => setSelectedBreeds(e.target.value as string[])}
                input={<OutlinedInput label="Breeds" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {breeds?.map((breed) => (
                  <MenuItem key={breed} value={breed}>{breed}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select label="Sort By" value={sortField} onChange={(e) => setSortField(e.target.value)}>
                <MenuItem value="breed">Breed</MenuItem>
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="age">Age</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <FormControl fullWidth>
              <InputLabel>Sort Order</InputLabel>
              <Select label="Sort Order" value={sortOrder} onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}>
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              label="Min Age"
              type="number"
              value={ageMin}
              onChange={(e) => setAgeMin(e.target.value === '' ? '' : Number(e.target.value))}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              label="Max Age"
              type="number"
              value={ageMax}
              onChange={(e) => setAgeMax(e.target.value === '' ? '' : Number(e.target.value))}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <FormControl fullWidth>
              <InputLabel>Items Per Page</InputLabel>
              <Select label="Items Per Page" value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                <MenuItem value="12">12</MenuItem>
                <MenuItem value="24">24</MenuItem>
                <MenuItem value="36">36</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {isLoading || breedsLoading || dogsLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
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

      <Box display="flex" justifyContent="space-between" mt={2}>
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

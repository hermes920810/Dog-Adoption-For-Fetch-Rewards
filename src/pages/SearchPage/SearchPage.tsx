import React from 'react';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import DogList from './components/DogList';
import MatchResult from './components/MatchResult';
import LogoutButton from './components/LogoutButton';

const SearchPage: React.FC = () => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Dog Adoption Search</Typography>
          <LogoutButton />
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        <DogList />
        <MatchResult />
      </Box>
    </Box>
  );
};

export default SearchPage;

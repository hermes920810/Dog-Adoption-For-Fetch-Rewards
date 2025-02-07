import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Snackbar, Alert } from '@mui/material';
import LoginPage from './pages/Auth/LoginPage';
import SearchPage from './pages/SearchPage/SearchPage';
import { useSelector } from 'react-redux';
import { RootState } from './store';

const App: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/search"
            element={isAuthenticated ? <SearchPage /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={3000}
        onClose={() => setErrorMessage(null)}
      >
        <Alert severity="error" onClose={() => setErrorMessage(null)}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default App;

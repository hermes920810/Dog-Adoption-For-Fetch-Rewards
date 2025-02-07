import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import App from './App';
import { store } from './store';
import './assets/styles/index.css';

const queryClient = new QueryClient();

// Create a Material-UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // primary color
    },
    secondary: {
      main: '#d32f2f', // secondary color
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // font family
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

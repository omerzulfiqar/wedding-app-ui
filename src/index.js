import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1D2C4C',
    },
    secondary: {
      main: '#fff7ee',
      contrastText: '#1D2C4C',
    },
    error: {
      main: '#e53935',
    },
    success: {
      main: '#4cb150',
    },
  },
  typography: {
    h3: {
      fontFamily: 'Great Vibes',
      fontWeight: 'bold',
    },
    h2: {
      fontFamily: 'Great Vibes',
      fontWeight: 'bold',
    },
    h5: {
      fontFamily: 'Alegreya SC',
      fontWeight: 'bold',
    },
    body1: {
      fontFamily: 'Alegreya SC',
      fontSize: 15,
    },
    body2: {
      fontFamily: 'Alegreya SC',
      fontSize: 15,
      fontWeight: 'bold',
    },
    subtitle2: {
      fontFamily: 'Alegreya SC',
      fontSize: 12,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

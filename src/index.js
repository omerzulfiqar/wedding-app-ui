import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  typography: {
    h3: {
      fontFamily: 'Great Vibes',
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

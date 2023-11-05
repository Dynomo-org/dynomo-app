import React from 'react'
import ReactDOM from 'react-dom/client'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { ThemeProvider, createTheme } from '@mui/material';
import { orange } from '@mui/material/colors';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import App from './App.jsx'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css'

const firebaseConfig = {
  apiKey: "AIzaSyDLMuvJBQmOaPQwazLHq2-QRH5gPhR21Pk",
  authDomain: "dynomo-d5f0c.firebaseapp.com",
  projectId: "dynomo-d5f0c",
  storageBucket: "dynomo-d5f0c.appspot.com",
  messagingSenderId: "96624912755",
  appId: "1:96624912755:web:1b7518ffe1234591eebd06",
  measurementId: "G-1T05JVWLL2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
getAnalytics(app)

// Initialize theme
const theme = createTheme({
  palette: {
    primary: {
      main: orange[700],
      contrastText: "#ffffff"
    },
  }
})

// init dayjs
dayjs.extend(utc)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
  </React.StrictMode>,
)

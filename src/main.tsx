import React from 'react'
import ReactDOM from 'react-dom/client'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
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

// Initialize query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false
    }
  },
})

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
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
)

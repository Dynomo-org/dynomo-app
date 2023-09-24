import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'

import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
)

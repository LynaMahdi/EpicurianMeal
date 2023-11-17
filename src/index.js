import React from 'react';
import ReactDOM from 'react-dom'; // Ici, utilisez simplement 'react-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="356518142639-o9maap6kv0o00mqd1885mqpq8lmnemea.apps.googleusercontent.com"></GoogleOAuthProvider>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

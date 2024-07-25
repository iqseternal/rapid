import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';
import '@scss/index.scss';

ReactDOM.createRoot(
  document.getElementById('root')!
).render(
  <StrictMode>
    <App />
  </StrictMode>
);

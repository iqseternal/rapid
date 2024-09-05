import React, { useState , StrictMode } from 'react';
import { useReactive } from '@rapid/libs-web';
import { themePlugins, app } from './plugins';
import { ENV, IS_DEV, PLATFORMS } from '@rapid/config/constants';

import ReactDOM from 'react-dom/client';
import App from './app';

import '@scss/index.scss';

app.use(themePlugins);
app.installAll();

const rootContainer = document.getElementById('root')!;

ReactDOM.createRoot(rootContainer).render(
  <StrictMode>
    <App />
  </StrictMode>

  // <App />
);

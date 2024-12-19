import { useState, StrictMode } from 'react';
import { useReactive } from '@rapid/libs-web';
import { themePlugins, app } from './plugins';
import { IS_DEV } from '@rapid/config/constants';

import ReactDOM from 'react-dom/client';
import RapidApp from './app';

import '@scss/index.scss';
import './tailwind.css';

app.use(themePlugins);
app.installAll();

const rootContainer = document.getElementById('root')!;

ReactDOM.createRoot(rootContainer).render(
  <StrictMode>
    <RapidApp />
  </StrictMode>
);

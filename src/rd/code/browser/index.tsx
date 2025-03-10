import './inject';

import { useState, StrictMode } from 'react';
import { Ansi } from '@rapid/libs';

import ReactDOM from 'react-dom/client';

import RdAppWrapper from './app';
import RdThemeExtension from './plats/extensions/RdThemeExtension';

import '@/scss/index.scss';

import './tailwind.css';

rApp.extension.registerExtension(RdThemeExtension);

// ===========================================================================================
const rootContainer = document.getElementById('root');

if (rootContainer) {
  ReactDOM.createRoot(rootContainer).render(
    <StrictMode>
      <RdAppWrapper />
    </StrictMode>
  );
}

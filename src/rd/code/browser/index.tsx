import './inject';
import './discrete';

import { StrictMode } from 'react';
import { RdAppWrapper } from './app';

import ReactDOM from 'react-dom/client';
import RdThemeExtension from './plats/extensions/RdThemeExtension';

import '@/scss/index.scss';

import './tailwind.css';

// ===========================================================================================
rApp.extension.registerExtension(RdThemeExtension);

const rootContainer = document.getElementById('root');

if (rootContainer) {
  ReactDOM.createRoot(rootContainer).render(
    <StrictMode>
      <RdAppWrapper />
    </StrictMode>
  );
}

import './inject';

import { useState, StrictMode } from 'react';
import { ThemeExtension } from '@/plugins/modules/theme';

import ReactDOM from 'react-dom/client';
import RapidApp from './app';

import '@scss/index.scss';
import './tailwind.css';

// TODO: 建议动态获取 KEY
;(async () => {
  // rApp.extension.registerExtension(ThemeExtension);

  requestAnimationFrame(() => {

    rApp.extension.registerExtension(ThemeExtension);
  })


})();


const rootContainer = document.getElementById('root')!;

ReactDOM.createRoot(rootContainer).render(
  <StrictMode>
    <RapidApp />
  </StrictMode>
);

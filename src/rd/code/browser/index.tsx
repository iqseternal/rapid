import './inject';

import { useState, StrictMode } from 'react';
import { ThemeExtension } from '@/plugins/modules/theme';
import { Ansi } from '@rapid/libs';

import ReactDOM from 'react-dom/client';
import RapidApp from './app';

import '@/scss/index.scss';

import './tailwind.css';

// TODO: 建议动态获取 KEY
; (async () => {
  requestAnimationFrame(() => {

    rApp.extension.registerExtension(ThemeExtension);
  })
})();

// ===========================================================================================
const rootContainer = document.getElementById('root');

if (rootContainer) {
  ReactDOM.createRoot(rootContainer).render(
    <StrictMode>
      <RapidApp />
    </StrictMode>
  );
}

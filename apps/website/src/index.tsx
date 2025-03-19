import { StrictMode, memo, useCallback } from 'react';
import { useShallowReactive } from '@rapid/libs-web/hooks';

import ReactDOM from 'react-dom/client';
import RApp from './app';

import './index.css';

export const RAppWrapper = memo(() => {

  return (
    <div className='w-full h-full'>
      <RApp />
    </div>
  )
})

// ===========================================================================================
const rootContainer = document.getElementById('root');

if (rootContainer) {
  ReactDOM.createRoot(rootContainer).render(
    <StrictMode>
      <RAppWrapper />
    </StrictMode>
  );
}


import { StrictMode, memo } from 'react';

import ReactDOM from 'react-dom/client';

import './index.css';

export const App = memo(() => {
  return (
    <div
      className={'w-full h-full text-center'}
    >
      App
    </div>
  )
})

// ===========================================================================================
const rootContainer = document.getElementById('root');

if (rootContainer) {
  ReactDOM.createRoot(rootContainer).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}


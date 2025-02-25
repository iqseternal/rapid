import { StrictMode } from 'react';

import ReactDOM from 'react-dom/client';

function App() {
  return (
    <div>
      App
    </div>
  )
}

// ===========================================================================================
const rootContainer = document.getElementById('root');

if (rootContainer) {
  ReactDOM.createRoot(rootContainer).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

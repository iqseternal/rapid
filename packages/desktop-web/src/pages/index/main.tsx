
import { app, themePlugins } from '@/plugins';
import { IS_DEV, IS_PROD, CONFIG } from '@rapid/config/constants';
import { StrictMode } from 'react';

import ReactDOM from 'react-dom/client';
import App from './app';

import '@scss/index.scss';

app.use(themePlugins);

app.installAll();

document.title = CONFIG.PROJECT.toLocaleLowerCase();
const rootContainer = document.getElementById('root') as (HTMLDivElement & { _root: any });

if (IS_DEV) {
  /**
   * vite hmr 会触发二次 createRoot,
   * 所以需要再开发模式避免误报错误信息
   */
  if (!rootContainer._root) rootContainer._root = ReactDOM.createRoot(rootContainer);
  rootContainer._root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

if (IS_PROD) {
  ReactDOM.createRoot(rootContainer).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

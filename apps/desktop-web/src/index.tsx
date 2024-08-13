import { useState } from 'react';
import { useReactive } from '@rapid/libs-web';
import { themePlugins, app } from './plugins';

import ReactDOM from 'react-dom/client';

import App from './app';

import '@scss/index.scss';

app.use(themePlugins);
app.installAll();


const rootContainer = document.getElementById('root') as (HTMLDivElement & { _root: any });
ReactDOM.createRoot(rootContainer).render(

  <App />
);

import './inject';

import { useState, StrictMode } from 'react';
import { ThemeExtension } from '@/plugins/modules/theme';
import { toColor, Ansi } from '@suey/printer';
import type { MetadataStoreChangedPayload } from '@rapid/extensions';

import ReactDOM from 'react-dom/client';
import RapidApp from './app';

import '@scss/index.scss';

import './tailwind.css';

// TODO: 建议动态获取 KEY
;(async () => {
  requestAnimationFrame(() => {

    rApp.extension.registerExtension(ThemeExtension);
  })


})();

;(async () => {
  let cached: MetadataStoreChangedPayload[] = [], timer: NodeJS.Timeout | undefined | number = void 0;

  const printCached = (payload: any) => {
    cached.push(payload);

    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      console.group(`${Ansi.AnsiTransformer.magenta}[Metadata Host${Ansi.AnsiTransformer.normal}${Ansi.AnsiTransformer.magenta}]${Ansi.AnsiTransformer.normal} ${Ansi.AnsiTransformer.grey}metadata store changed.`);

      for (let i = 0;i < cached.length;i ++) {
        const temp = cached[i];
        printer.print(`[${temp.action}] [${temp.type}] [${Ansi.AnsiTransformer.green}${String(temp.metadataKey)}${Ansi.AnsiTransformer.normal}]`);
      }

      console.groupEnd();

      cached = [];
      timer = void 0;
    }, 50);
  }

  rApp.metadata.subscribeMetadataStoreChanged((payload) => {

    printCached(payload);
  })
})();

;(async () => {


  console.group(`${Ansi.AnsiTransformer.magenta}[Extension Host${Ansi.AnsiTransformer.normal}${Ansi.AnsiTransformer.magenta}]${Ansi.AnsiTransformer.normal} xxx activated`);
})();

// ===========================================================================================
const rootContainer = document.getElementById('root')!;

ReactDOM.createRoot(rootContainer).render(
  <StrictMode>
    <RapidApp />
  </StrictMode>
);

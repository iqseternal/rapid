import './inject';

import { useState, StrictMode, memo, useLayoutEffect } from 'react';
import { Ansi } from '@rapid/libs';
import type { RExtensionContext } from './declare';
import { RdSKin } from './skin';

import ReactDOM from 'react-dom/client';
import RdApp from './app';
import RdThemeExtension from './plats/extensions/RdThemeExtension';

import '@/scss/index.scss';

import './tailwind.css';

// ===========================================================================================
rApp.extension.registerExtension(RdThemeExtension);

/**
 * App component, 这里做各种功能的插入：例如 插件等等
 */
const RdAppWrapper = memo(() => {
  const [extensionList] = rApp.extension.useExtensionsList();
  useLayoutEffect(() => {
    const context: RExtensionContext = {}

    extensionList.forEach(extension => {
      extension.onActivated?.(context);
    })
  }, [extensionList]);


  const themePayloadTransformers = rApp.metadata.useMetadata('functional.theme.variables.transformer');
  useLayoutEffect(() => {
    if (!themePayloadTransformers) return;

    let declaration = RdSKin.toCssVariablesDeclaration();
    themePayloadTransformers.forEach(transform => {
      declaration = transform(declaration);
    })

    RdSKin.install(declaration);

    return () => {
      RdSKin.uninstall();
    }
  }, [themePayloadTransformers]);

  return (<RdApp />)
})

const rootContainer = document.getElementById('root');

if (rootContainer) {
  ReactDOM.createRoot(rootContainer).render(
    <StrictMode>
      <RdAppWrapper />
    </StrictMode>
  );
}

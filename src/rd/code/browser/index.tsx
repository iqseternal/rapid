import 'reflect-metadata';
import './inject';
import './discrete';

import { StrictMode } from 'react';
import { RdAppWrapper } from './app';
import { injectReadonlyVariable } from '@suey/pkg-utils';

import ReactDOM from 'react-dom/client';
import React from 'react';
import moment from 'moment';

import * as Antd from 'antd';
import * as spring from '@react-spring/web';
import * as transitionGroup from 'react-transition-group';
import * as ReactRouterDOM from 'react-router-dom';

import './i18n';
import '@/scss/index.scss';
import './tailwind.css';

/**
 * 创建子项目需要的环境变量值
 */
async function setupEnvironments() {
  injectReadonlyVariable(window, 'React', React);
  injectReadonlyVariable(window, 'ReactDOM', ReactDOM);
  injectReadonlyVariable(window, 'ReactRouterDOM', ReactRouterDOM);
  injectReadonlyVariable(window, 'moment', moment);
  injectReadonlyVariable(window, 'Antd', Antd);
  injectReadonlyVariable(window, 'spring', spring);
  injectReadonlyVariable(window, 'transitionGroup', transitionGroup);
}

; ((async () => {
  await setupEnvironments();

  const rootContainer = document.getElementById('root');
  if (rootContainer) {
    ReactDOM.createRoot(rootContainer).render(
      <StrictMode>
        <RdAppWrapper />
      </StrictMode>
    );
  }
  //
  // window.electron.webFrame.setZoomLevel(1);
  // window.electron.webFrame.setZoomFactor(1);
})());

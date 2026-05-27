import 'reflect-metadata';
import './inject';
import './discrete';

import { StrictMode } from 'react';
import { RdAppWrapper } from './app';
import { injectReadonlyVariable } from '@suey/pkg-utils';

import { useUserStore } from './stores';

import ReactDOM from 'react-dom/client';
import React from 'react';
import moment from 'moment';

import * as Antd from 'antd';
import * as spring from '@react-spring/web';
import * as transitionGroup from 'react-transition-group';
import * as ReactRouterDOM from 'react-router-dom';

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

/**
 * 初始化数据
 */
async function initStoresState() {
  useUserStore.init().catch(() => {
    injector.printer.printWarn("useUserStore: 数据初始化失败");
  })
}

; ((async () => {
  await setupEnvironments();

  initStoresState().catch(err => err);

  const rootContainer = document.getElementById('root');
  if (rootContainer) {
    ReactDOM.createRoot(rootContainer).render(
      <StrictMode>
        <RdAppWrapper />
      </StrictMode>
    );
  }
})());

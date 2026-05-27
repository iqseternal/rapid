import 'reflect-metadata';
import './inject';
import './discrete';

import { StrictMode } from 'react';
import { RdAppWrapper } from './app';
import { reflectx } from '@suey/pkg-utils';

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
  reflectx.defineReadonlyProperty(window, 'React', React);
  reflectx.defineReadonlyProperty(window, 'ReactDOM', ReactDOM);
  reflectx.defineReadonlyProperty(window, 'ReactRouterDOM', ReactRouterDOM);
  reflectx.defineReadonlyProperty(window, 'moment', moment);
  reflectx.defineReadonlyProperty(window, 'Antd', Antd);
  reflectx.defineReadonlyProperty(window, 'spring', spring);
  reflectx.defineReadonlyProperty(window, 'transitionGroup', transitionGroup);
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

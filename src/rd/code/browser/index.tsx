import './inject';
import './discrete';

import { StrictMode } from 'react';
import { Thread } from 'rd/base/browser';
import { RdAppWrapper } from './app';
import { Application } from './app';
import { toNils } from '@suey/pkg-utils';

const application = new Application();

toNils(
  application.registerInnerExtensions(),
  application.registerLocalExtensions(),
  application.registerOnlineExtensions()
);

application.renderReactApp();

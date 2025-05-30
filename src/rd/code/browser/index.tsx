import './inject';
import './discrete';

import { StrictMode } from 'react';
import { RdAppWrapper } from './app';
import { Application } from './app';
import { toNils } from '@suey/pkg-utils';

const application = new Application();


application.registerInnerExtensions();
application.registerLocalExtensions();
application.registerOnlineExtensions();


application.renderReactApp();



import './inject';
import './discrete';

import { StrictMode } from 'react';
import { Thread } from 'rd/base/browser';
import { RdAppWrapper } from './app';
import { Application } from './app';


const application = new Application();

await application.registerInnerExtensions();

application.registerLocalExtensions();
application.registerOnlineExtensions();

application.renderReactApp();

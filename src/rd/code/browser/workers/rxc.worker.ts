
import { apiGet } from '@suey/pkg-utils';
import { Thread } from 'rd/base/browser';

import type * as Rapid from '../declare';

const mainThread = new Thread<Rapid.Thread.MainThreadEntries, Rapid.Thread.ExtensionThreadEntries>();

mainThread.handle('log', data => {


})


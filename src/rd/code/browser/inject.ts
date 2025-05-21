import { Emitter, Invoker } from '@rapid/libs-web';
import type { RApp } from './declare';
import { cssVars, RdSKin } from './skin';
import { Extension, ExtensionManager, MetadataManager } from '@suey/rxp-meta';
import { injectReadonlyVariable } from '@rapid/libs';
import { useUserStore, useDocStore, useThemeStore, useTldrawStore } from './features';
import { Metadata, Bus } from './declare';
import { Thread } from 'rd/base/browser';
import { rxcThread } from './workers';

import type * as Rapid from './declare';

const extensionManager = new ExtensionManager();

const metadataManager = new MetadataManager<Metadata.MetadataEntries>();

const emitter = new Emitter<Bus.BusEmitterEntries>();

const invoker = new Invoker<Bus.BusInvokerEntries>();

const rApp = Object.freeze<RApp>({
  extension: extensionManager,

  metadata: metadataManager,

  RdSKin: RdSKin,

  emitter: emitter,

  invoker: invoker,

  stores: {
    useUserStore,

    useDocStore,

    useThemeStore,

    useTldrawStore
  },

  threads: {
    rxcThread: rxcThread
  }
});

injectReadonlyVariable(window, 'cssVars', cssVars);
injectReadonlyVariable(window, 'rApp', rApp);

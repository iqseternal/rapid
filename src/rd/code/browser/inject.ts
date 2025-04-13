import { Emitter, Invoker } from '@rapid/libs-web';
import type { RApp } from './declare';
import { cssVars, RdSKin } from './skin';
import { Extension, ExtensionManager, MetadataManager } from '@suey/rxp-meta';
import { inject } from '@rapid/libs/inject';
import { useUserStore, useDocStore, useThemeStore, useTldrawStore } from './features';
import { Metadata, Bus } from './declare';

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
  }
});

inject(window, 'cssVars', cssVars);
inject(window, 'rApp', rApp);

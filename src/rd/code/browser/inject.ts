import { Emitter } from '@rapid/libs-web';
import type { RApp } from './declare';
import { cssVars, RdSKin } from './skin';
import { Extension, ExtensionManager, MetadataManager } from '@rapid/extensions';
import { inject } from '@rapid/libs/inject';
import { useUserStore, useDocStore, useThemeStore, useTldrawStore } from './features';
import { Metadata, Bus } from './declare';

const extensionManager = new ExtensionManager();

const metadataManager = new MetadataManager<Metadata.MetadataEntries>();

const emitter = new Emitter<Bus.BusEvent>();

const rApp = Object.freeze<RApp>({
  extension: extensionManager,

  metadata: metadataManager,

  RdSKin: RdSKin,

  emitter: emitter,

  stores: {
    useUserStore,

    useDocStore,

    useThemeStore,

    useTldrawStore
  }
});

inject(window, 'cssVars', cssVars);
inject(window, 'rApp', rApp);

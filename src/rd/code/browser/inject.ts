import { Bus } from '@rapid/libs-web';
import type { RApp } from './declare';
import { cssVars, RdSKin } from './skin';
import { Extension, ExtensionManager, MetadataManager } from '@rapid/extensions';
import { inject } from '@rapid/libs/inject';
import { useUserStore, useDocStore, useThemeStore, useTldrawStore } from './features';

const extensionManager = new ExtensionManager();

const metadataManager = new MetadataManager<Rapid.Metadata.MetadataEntries>();

const bus = new Bus<Rapid.Bus.BusEvent>();

const rApp = Object.freeze<RApp>({
  extension: extensionManager,

  metadata: metadataManager,

  RdSKin: RdSKin,

  bus: bus,

  stores: {
    useUserStore,

    useDocStore,

    useThemeStore,

    useTldrawStore
  }
});

inject(window, 'cssVars', cssVars);
inject(window, 'rApp', rApp);

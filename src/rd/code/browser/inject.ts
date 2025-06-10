import {
  Emitter,
  Invoker,
  classnames,
  isReactClassComponent,
  isReactComponent,
  isReactFC,
  isReactForwardFC,
  isReactLazyFC,
  isReactMemoFC
} from '@rapid/libs-web';
import {
  ExtensionManager,
  MetadataManager
} from '@suey/rxp-meta';
import {
  AES_DEFAULT_KEY,
  Ansi,
  aesDecrypt,
  aesDecryptAlgorithm,
  aesEncrypt,
  aesEncryptAlgorithm,
  apiDelete,
  apiGet,
  apiPost,
  apiPut,
  createApiRequest,
  createRequest,
  createSallowProxy,
  cryptoTs,
  injectReadonlyVariable,
  jose,
  jsr,
  request,
  toNil,
  toNils,
  toWaitPromise
} from '@rapid/libs';
import {
  useUserStore,
  useDocStore,
  useThemeStore,
} from './features';
import { Skin } from 'rd/base/browser/service/Skin';
import { cssVariablesPayloadSheet } from './skin/payload';
import { rxcThread } from './workers';

const extensionManager = new ExtensionManager();

const metadataManager = new MetadataManager<Rapid.Extend.Metadata.MetadataEntries>();

const emitter = new Emitter<Rapid.Bus.BusEmitterEntries>();

const invoker = new Invoker<Rapid.Bus.BusInvokerEntries>();

const skin = new Skin(cssVariablesPayloadSheet);

const cssVars = skin.toCssVars();

const rApp: Rapid.RApp = ({
  extension: extensionManager,
  metadata: metadataManager,
  emitter: emitter,
  invoker: invoker,

  stores: {
    useUserStore,
    useDocStore,
    useThemeStore,
  },
  threads: {
    rxcThread: rxcThread
  },

  meta2d: void 0,

  skin: skin,

  libs: {
    injectReadonlyVariable: injectReadonlyVariable,
    createSallowProxy: createSallowProxy,

    apiGet: apiGet,
    apiPost: apiPost,
    apiDelete: apiDelete,
    apiPut: apiPut,
    request: request,
    createApiRequest: createApiRequest,
    createRequest: createRequest,

    aesEncrypt: aesEncrypt,
    aesEncryptAlgorithm: aesEncryptAlgorithm,
    aesDecrypt: aesDecrypt,
    aesDecryptAlgorithm: aesDecryptAlgorithm,

    AES_DEFAULT_KEY: AES_DEFAULT_KEY,

    jose: jose,
    cryptoTs: cryptoTs,
    jsr: jsr,

    toNil: toNil,
    toNils: toNils,
    toWaitPromise: toWaitPromise,

    Ansi: Ansi,

    classnames: classnames,

    isReactClassComponent: isReactClassComponent,
    isReactComponent: isReactComponent,
    isReactFC: isReactFC,
    isReactForwardFC: isReactForwardFC,
    isReactLazyFC: isReactLazyFC,
    isReactMemoFC: isReactMemoFC,

    Skin: Skin,
    Emitter: Emitter,
    Invoker: Invoker,
    ExtensionManager: ExtensionManager,
    MetadataManager: MetadataManager
  }
});

injectReadonlyVariable(window, 'cssVars', cssVars);

injectReadonlyVariable(window, 'rApp', rApp);



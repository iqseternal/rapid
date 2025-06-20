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
import { ExtensionManager, MetadataManager } from '@suey/rxp-meta';
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
import { useUserStore, useDocStore, useThemeStore } from './features';
import { Skin, makeRdCssVarPayload, mrcvp } from 'rd/base/browser/service/Skin';
import { cssVariablesPayloadSheet } from './skin';
import { rxcThread } from './workers';
import { useTranslation } from 'react-i18next';
import { rApiGet, rApiDelete, rApiPatch, rApiPost, rApiPut, rCreateApi, rRequest } from 'rd/base/common/api';
import { Ellipsis } from '@rapid/libs-web';
import { Timestamp } from 'rd/base/common/constants';
import { defineRawType, defineCompleteType } from '@rapid/libs';

import IconFont from './components/IconFont';
import Empty from './components/Empty';
import Widget from './components/Widget';

import i18n from './i18n';
import moment from 'moment';

import * as Antd from 'antd';
import * as spring from '@react-spring/web';
import * as transitionGroup from 'react-transition-group';

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
  meta2d: void 0,

  Antd: Antd,
  spring: spring,
  transitionGroup: transitionGroup,
  moment: moment,

  electron: window.electron,
  ipcActions: window.ipcActions,
  printer: window.printer,

  constants: {
    Timestamp: Timestamp
  },

  i18n: {
    i18n: i18n,
    useTranslation: useTranslation
  },

  threads: {
    rxcThread: rxcThread
  },

  stores: {
    useUserStore,
    useDocStore,
    useThemeStore,
  },
  components: {
    Ellipsis: Ellipsis,
    IconFont: IconFont,
    Widget: Widget,
    Empty: Empty
  },
  skin: {
    skin: skin,
    mrcvp: mrcvp,
    makeRdCssVarPayload: makeRdCssVarPayload,
    Skin: Skin,
  },
  services: {
    Skin: Skin,
    Emitter: Emitter,
    Invoker: Invoker,
    ExtensionManager: ExtensionManager,
    MetadataManager: MetadataManager,
  },
  libs: {
    injectReadonlyVariable: injectReadonlyVariable,
    createSallowProxy: createSallowProxy,

    rApiGet: rApiGet,
    rApiPost: rApiPost,
    rApiPut: rApiPut,
    rApiDelete: rApiDelete,
    rRequest: rRequest,
    rApiPatch: rApiPatch,
    rCreateApi: rCreateApi,

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

    defineCompleteType: defineCompleteType,
    defineRawType: defineRawType
  },
});

injectReadonlyVariable(window, 'cssVars', cssVars);

injectReadonlyVariable(window, 'rApp', rApp);



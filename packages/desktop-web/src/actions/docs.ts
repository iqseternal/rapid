import type { Handlers, HandlerMethodTyped } from 'node_modules/@rapid/desktop-node/preload';
import { makeInvokeActions } from './ipcRenderer';


export const docOpen = makeInvokeActions('IpcDoc/openDoc');

export const docSave = makeInvokeActions('IpcDoc/save');

export const docSaveAs: Handlers['IpcDoc/saveAs'] = (...args) => window.electron.ipcRenderer.invoke('IpcDoc/saveAs', ...args);

export const docExport: Handlers['IpcDoc/exportsDoc'] = (...args) => window.electron.ipcRenderer.invoke('IpcDoc/exportsDoc', ...args);

export const docImport: Handlers['IpcDoc/importDoc'] = (...args) => window.electron.ipcRenderer.invoke('IpcDoc/importDoc', ...args);

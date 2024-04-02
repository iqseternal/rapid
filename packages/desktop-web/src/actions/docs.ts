import type { Handlers, HandlerMethodTyped } from 'node_modules/@rapid/desktop-node/preload';


export const docOpen = (...args: Parameters<Handlers['IpcDoc/openDoc']>) => window.electron.ipcRenderer.invoke('IpcDoc/openDoc', ...args);

export const docSave = (...args: Parameters<Handlers['IpcDoc/save']>) => window.electron.ipcRenderer.invoke('IpcDoc/save', ...args);

export const docSaveAs: Handlers['IpcDoc/saveAs'] = (...args) => window.electron.ipcRenderer.invoke('IpcDoc/saveAs', ...args);

export const docExport: Handlers['IpcDoc/exportsDoc'] = (...args) => window.electron.ipcRenderer.invoke('IpcDoc/exportsDoc', ...args);

export const docImport: Handlers['IpcDoc/importDoc'] = (...args) => window.electron.ipcRenderer.invoke('IpcDoc/importDoc', ...args);

import { makeInvokeActions } from './ipcRenderer';

/** 打开文档数据 */
export const docOpen = makeInvokeActions('IpcDoc/openDoc');

export const docSave = makeInvokeActions('IpcDoc/save');

export const docSaveAs = makeInvokeActions('IpcDoc/saveAs');

export const docExport = makeInvokeActions('IpcDoc/exportsDoc');

export const docImport = makeInvokeActions('IpcDoc/importDoc');

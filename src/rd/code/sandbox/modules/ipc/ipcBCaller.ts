
import { IpcBCaller } from '@suey/elec-ipc-core';
import type { MutateProcessorSheet, IpcCompatibleProcessor } from '@suey/elec-ipc-core';

import type * as AllIpcProcessors from 'rd/base/main/ipc/handlers';
import type * as StoreIpcProcessors from 'rd/base/main/ipc/handlers/ipcStoreHandler';

export type IpcProcessorsCompileSheet = {
  readonly [Key in keyof typeof AllIpcProcessors]: (typeof AllIpcProcessors)[Key] extends IpcCompatibleProcessor ? (typeof AllIpcProcessors)[Key] : never;
};

export type IpcProcessorSheet = MutateProcessorSheet<IpcProcessorsCompileSheet>;

export const ipcBCaller = new IpcBCaller<
  Omit<
    IpcProcessorSheet,
    | IpcProcessorsCompileSheet[keyof typeof StoreIpcProcessors]['channel']
  >
>();

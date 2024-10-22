import { IS_BROWSER } from '@rapid/config/constants';
import type { HandleHandlers } from 'node_modules/@rapid/desktop-preload';

export const makeInvokeActions = <InvokeKey extends keyof HandleHandlers>(invokeKey: InvokeKey): HandleHandlers[InvokeKey] => {
  if (IS_BROWSER || !window.electron) return ((...args: unknown[]) => Promise.resolve()) as unknown as HandleHandlers[InvokeKey];

  return ((...args: Parameters<HandleHandlers[InvokeKey]>) => {

    return window.electron.ipcRenderer.invoke(invokeKey, ...args as Parameters<HandleHandlers[InvokeKey]>);
  }) as unknown as HandleHandlers[InvokeKey];
}

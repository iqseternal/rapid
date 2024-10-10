import type { HandleHandlers } from 'node_modules/@rapid/desktop-preload';
import { IS_BROWSER } from '@rapid/config/constants';

export const makeInvokeActions = <InvokeKey extends keyof HandleHandlers>(invokeKey: InvokeKey): HandleHandlers[InvokeKey] => {
  if (IS_BROWSER || !window.electron) return ((...args: unknown[]) => Promise.resolve()) as unknown as HandleHandlers[InvokeKey];

  const action: HandleHandlers[InvokeKey] = ((...args: Parameters<HandleHandlers[InvokeKey]>) => {

    return window.electron.ipcRenderer.invoke(invokeKey, ...args as Parameters<HandleHandlers[InvokeKey]>);
  }) as unknown as HandleHandlers[InvokeKey];

  return action;
}

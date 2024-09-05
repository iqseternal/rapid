import type { Handlers } from 'node_modules/@rapid/desktop-preload';
import { IS_WEB, PLATFORMS } from '@rapid/config/constants';

export const makeInvokeActions = <InvokeKey extends keyof Handlers>(invokeKey: InvokeKey): Handlers[InvokeKey] => {
  if (IS_WEB || !window.electron) return ((...args: unknown[]) => Promise.resolve()) as unknown as Handlers[InvokeKey];

  const action: Handlers[InvokeKey] = ((...args: Parameters<Handlers[InvokeKey]>) => {
    return window.electron.ipcRenderer.invoke(invokeKey, ...args as Parameters<Handlers[InvokeKey]>);
  }) as unknown as Handlers[InvokeKey];

  return action;
}

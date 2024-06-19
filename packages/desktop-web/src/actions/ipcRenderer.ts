import type { Handlers, HandlerMethodTyped } from 'node_modules/@rapid/desktop-node/preload';
import { IS_WEB, PLATFORMS } from '@rapid/config/constants';

export const makeInvokeActions = <InvokeKey extends keyof Handlers>(invokeKey: InvokeKey): Handlers[InvokeKey] => {
  if (IS_WEB) return ((...args: unknown[]) => Promise.reject()) as unknown as Handlers[InvokeKey];

  const action: Handlers[InvokeKey] = ((...args: Parameters<Handlers[InvokeKey]>) => {
    return window.electron.ipcRenderer.invoke(invokeKey, ...args as Parameters<Handlers[InvokeKey]>);
  }) as unknown as Handlers[InvokeKey];

  return action;
}



import type { Handlers, HandlerMethodTyped } from 'node_modules/@rapid/desktop-node/preload';

export const makeInvokeActions = <InvokeKey extends keyof Handlers>(invokeKey: InvokeKey): Handlers[InvokeKey] => {

  const action: Handlers[InvokeKey] = ((...args: Parameters<Handlers[InvokeKey]>) => {
    return window.electron.ipcRenderer.invoke(invokeKey, ...args as Parameters<Handlers[InvokeKey]>);
  }) as unknown as Handlers[InvokeKey];

  return action;
}


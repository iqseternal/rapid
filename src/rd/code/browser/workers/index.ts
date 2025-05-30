import { Thread } from 'rd/base/browser/service/Thread';
import type * as Rapid from '../declare';

const rxcThread = new Thread<Rapid.Thread.ExtensionThreadEntries, Rapid.Thread.MainThreadEntries>(new Worker(new URL('./rxc.worker.ts', import.meta.url)));

rxcThread.handle('rxc:extension-changed', (extensionIds) => {

  const extensions = rApp.extension.getExtensions();

  extensions.forEach((extension) => {

    console.log(extension);
  })
})

export { rxcThread };

import { Thread } from 'rd/base/browser';
import type * as Rapid from '../declare';

const rxcThread = new Thread<Rapid.Thread.ExtensionThreadEntries, Rapid.Thread.MainThreadEntries>(new Worker(new URL('./rxc.worker.ts', import.meta.url)));

export { rxcThread };

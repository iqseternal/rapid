import type {  } from 'electron';

export interface MIpcInterface {
  'ipcWindowMax': (x: number, y: number) => boolean;

  'ipcWindowMin': (x: number, y: number) => boolean;

  'ipcWindowClose': () => void;

  'ipcGetAppPath': () => string;
}

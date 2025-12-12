import type {  } from 'electron';


interface WindowService {

}


export interface MIpcInterface {
  'ipcWindowMax': (x: number, y: number) => boolean;

  'ipcWindowMin': (x: number, y: number) => boolean;

  'ipcWindowClose': () => void;

  'ipcGetAppPath': () => string;
}





import type { StoreKeyMap } from '@rapid/config/constants';
import ElectronStore from 'electron-store';


export const appStore = new ElectronStore<StoreKeyMap>();

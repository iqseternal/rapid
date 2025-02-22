import { AppStore } from 'rd/base/plats/service/AppStoreService';
import { EXTENSIONS } from '@rapid/config/constants';

export interface UserConfigStoreType {
  mainWindowMemoryWidth: number;
  mainWindowMemoryHeight: number;
}

export const userConfigStore = AppStore.getInstance<UserConfigStoreType>('USER_CONFIG', {
  fileName: 'userConfig',
  fileExtension: EXTENSIONS.USER_CONFIG_STORE
});

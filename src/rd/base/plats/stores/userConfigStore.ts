import { RdStoreService } from '../service/RdStoreService';
import { EXTENSIONS } from '@rapid/config/constants';

export interface UserConfigStoreType {
  mainWindowMemoryWidth: number;
  mainWindowMemoryHeight: number;
}

export const userConfigStore = RdStoreService.getInstance<UserConfigStoreType>('USER_CONFIG', {
  name: 'userConfig',

  fileExtension: EXTENSIONS.USER_CONFIG_STORE
});

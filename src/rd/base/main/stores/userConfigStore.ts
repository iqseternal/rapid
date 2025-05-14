import { RdStoreService } from '../service/RdStoreService';

export interface UserConfigStoreType {
  mainWindowMemoryWidth: number;
  mainWindowMemoryHeight: number;
}

export const userConfigStore = RdStoreService.getInstance<UserConfigStoreType>('USER_CONFIG', {
  name: 'userConfig',

  fileExtension: 'json'
});

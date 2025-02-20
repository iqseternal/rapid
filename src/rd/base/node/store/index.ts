import { AppStore } from 'rd/base/node/core/service/AppStoreService';
import { EXTENSIONS } from '@rapid/config/constants';

export interface AppStoreType {


  refreshToken: string;
  accessToken: string;
}

export const appStore = AppStore.getInstance<AppStoreType>('APP_STORE', {
  fileName: 'app',
  fileExtension: EXTENSIONS.APP_STORE
});

export interface AppConfigStoreType {

}

export const appConfigStore = AppStore.getInstance<AppConfigStoreType>('APP_CONFIG', {
  fileName: 'appConfig',
  fileExtension: EXTENSIONS.APP_CONFIG_STORE
});

export interface UserConfigStoreType {
  mainWindowMemoryWidth: number;
  mainWindowMemoryHeight: number;
}

export const userConfigStore = AppStore.getInstance<UserConfigStoreType>('USER_CONFIG', {
  fileName: 'userConfig',
  fileExtension: EXTENSIONS.USER_CONFIG_STORE
});

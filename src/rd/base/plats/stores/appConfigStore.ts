import { AppStore } from 'rd/base/plats/service/AppStoreService';
import { EXTENSIONS } from '@rapid/config/constants';

export interface AppConfigStoreType {

}

export const appConfigStore = AppStore.getInstance<AppConfigStoreType>('APP_CONFIG', {
  fileName: 'appConfig',
  fileExtension: EXTENSIONS.APP_CONFIG_STORE
});

import { AppStore } from 'rd/base/plats/service/AppStoreService';
import { EXTENSIONS } from '@rapid/config/constants';

export interface AppStoreType {


  refreshToken: string;
  accessToken: string;
}

export const appStore = AppStore.getInstance<AppStoreType>('APP_STORE', {
  fileName: 'app',
  fileExtension: EXTENSIONS.APP_STORE
});

import { RdStoreService } from '../service/RdStoreService';
import { EXTENSIONS } from '@rapid/config/constants';

export interface AppStoreType {


  refreshToken: string;
  accessToken: string;
}

export const appStore = RdStoreService.getInstance<AppStoreType>('APP_STORE', {
  name: 'app',

  fileExtension: EXTENSIONS.APP_STORE
});

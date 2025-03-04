import { RdStoreService } from '../service/RdStoreService';

export interface AppStoreType {


  refreshToken: string;
  accessToken: string;
}

export const appStore = RdStoreService.getInstance<AppStoreType>('APP_STORE', {
  name: 'app',

  fileExtension: 'rdc'
});

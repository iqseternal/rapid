import { RdStoreService } from '../service/RdStoreService';
import { EXTENSIONS } from '@rapid/config/constants';

export interface AppConfigStoreType {

}

export const appConfigStore = RdStoreService.getInstance<AppConfigStoreType>('APP_CONFIG', {
  name: 'appConfig',

  fileExtension: EXTENSIONS.APP_CONFIG_STORE
});

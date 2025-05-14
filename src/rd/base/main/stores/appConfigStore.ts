import { RdStoreService } from '../service/RdStoreService';

export interface AppConfigStoreType {

}

export const appConfigStore = RdStoreService.getInstance<AppConfigStoreType>('APP_CONFIG', {
  name: 'appConfig',

  fileExtension: 'json',
});

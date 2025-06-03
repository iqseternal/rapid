
import { PackInformationService } from 'rd/base/common/service/PackInformationService';
import { SingleInstanceService } from 'rd/base/common/service/SingleInstanceService';

const packInformation = PackInformationService.getInstance();

/**
 * AppInformationService
 */
export class AppInformationService extends SingleInstanceService {
  public readonly information = {

    appName: packInformation.information.name,
    appVersion: packInformation.information.version,

    appApiUrls: {

      rApi: 'http://oupro.cn/api/v1/',
      // rApi: 'http://127.0.0.1:3000/api/v1/',
      rxApi: 'http://oupro.cn'



    }

  } as const;

}

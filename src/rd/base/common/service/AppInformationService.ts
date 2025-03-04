
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

      rApi: 'http://www.oupro.cn:3000/api/v1.0.0/'



    }

  } as const;

}

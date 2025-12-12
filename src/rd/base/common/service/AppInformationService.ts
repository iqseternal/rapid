
import { PackInformationService } from 'rd/base/common/service/PackInformationService';
import { SingleInstanceService } from 'rd/base/common/service/SingleInstanceService';

const packInformation = PackInformationService.getInstance();

/**
 * AppInformationService
 */
export class AppInformationService extends SingleInstanceService {
  public readonly information = {

    appName: packInformation.information.name,

    appVersion: `V${packInformation.information.version}`,

    appApiUrls: {
      rApiServerHost: 'http://oupro.cn/',
      rApiServerV1: 'http://oupro.cn/api/v1/',

      // rApi: 'http://127.0.0.1:3000/api/v1/',
      rxApiServer: 'http://rx-mp-server.oupro.cn/'
    }

  } as const;
}


import { SingleInstanceService } from 'rd/base/common/service/SingleInstanceService';

import * as rootPackageJson from 'rd/../../package.json';

/**
 * PackInformationService
 */
export class PackInformationService extends SingleInstanceService {
  public readonly information = rootPackageJson;
}

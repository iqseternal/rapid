import { DIST_WEBSITE_DIR } from '../config/builder/dirs';
import { putContent, type PutArgs } from './libs';
import * as path from 'path';

export const putWebsite: PutArgs = [
  'scp',
  [
    '-r',
    path.join(DIST_WEBSITE_DIR, '*'),
    'root@oupro.cn:/www/wwwroot/oupro/dist'
  ]
];

putContent(putWebsite);

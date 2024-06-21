import { DIST_WEBSITE_DIR } from '../packages/config/dirs';
import { putContent, type PutArgs } from './libs';
import * as path from 'path';

const putWebsite: PutArgs = [
  'scp',
  [
    '-r',
    path.join(DIST_WEBSITE_DIR, '*'),
    'root@oupro.cn:/www/wwwroot/oupro/dist'
  ]
];

putContent(putWebsite);

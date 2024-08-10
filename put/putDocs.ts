import { DIST_DOC_DIR } from '../packages/config/dirs';
import { putContent, type PutArgs } from './libs';
import * as path from 'path';

export const putDocs: PutArgs = [
  'scp',
  [
    '-r',
    path.join(DIST_DOC_DIR, '*'),
    'root@oupro.cn:/www/wwwroot/rapid-doc/dist'
  ]
];

putContent(putDocs);

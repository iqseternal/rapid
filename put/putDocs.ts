import { DIST_DOC_DIR } from '../config/node/dirs';
import { putContent, type PutArgs } from './libs';
import * as path from 'path';

export const putDocs: PutArgs = [
  'scp',
  [
    '-r',
    path.join(DIST_DOC_DIR, '*'),
    'root@oupro.cn:/www/wwwroot/rapid_doc/dist'
  ]
];

putContent(putDocs);

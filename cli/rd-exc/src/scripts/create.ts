import * as fs from 'fs';
import * as path from 'path';
import * as fse from 'fs-extra';

export interface CreateActionOptions {

}

export function createAction(extName: string, options: CreateActionOptions) {

  const cwd = process.cwd();

  const dir = path.join(cwd, extName);

  if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
    console.error(`目录 ${dir} 已存在`);
    process.exit(1);
  }

  fs.mkdirSync(dir);

  fse.copy(path.join(__dirname, '../../templates/online'), dir);
}

import { spawn } from 'child_process';
import { DIST_DIR, DIST_WEBSITE_DIR } from '../../packages/config/dirs';
import { Printer } from '@suey/printer';

export type PutArgs = Parameters<typeof spawn> extends [...infer Rest, infer U] ? Rest : never;

/**
 * 将内容推送到远程服务器
 * @param args
 */
export function putContent(args: PutArgs) {
  const executor = spawn(...args);

  executor.stderr?.on('data', (data) => {
    Printer.printError(data.toString());
  })

  executor.stdout?.on('data', (data) => {
    Printer.printInfo(data.toString());
  })

  executor.stdout?.on('end', () => {
    // Printer.printInfo('publish success!');
  })

  executor.on('close', (code) => {
    if (code !== 0) {
      Printer.printError('publish error!');
    }
  });
}



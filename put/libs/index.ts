import { spawn } from 'child_process';

export type PutArgs = Parameters<typeof spawn> extends [...infer Rest, infer U] ? Rest : never;

/**
 * 将内容推送到远程服务器
 * @param args
 */
export function putContent(args: PutArgs) {
  const executor = spawn(...args);

  executor.stderr?.on('data', (data) => {
    console.error(data.toString());
  })

  executor.stdout?.on('data', (data) => {
    console.log(data.toString());
  })

  executor.stdout?.on('end', () => {
    // console.log('publish success!');
  })

  executor.on('close', (code) => {
    if (code !== 0) {
      console.error('publish error!');
    }
  });
}



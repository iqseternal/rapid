
import { resolve } from 'path';
import type { ChildProcess } from 'child_process';
import { Printer } from '@suey/printer';
import { exec } from 'child_process';
import { DIRS } from '../builder';

import treeKill from 'tree-kill';

const bin = resolve(DIRS.ROOT_DIR, './node_modules/.bin/electron');

interface ElectronServiceState {
  /**
   * 存储启动的 electron 子进程
   */
  electronChildProcess?: ChildProcess;

  /**
   * 当前是否 kill 完成子进程
   */
  isKillDone: boolean;
}

/**
 * ElectronService
 */
export class ElectronService {
  private readonly state: ElectronServiceState = {
    electronChildProcess: void 0,
    isKillDone: true,
  }

  private readonly bindThisExitElectronProcess = this.exitElectronProcess.bind(this);
  private readonly bindThisExitCurrentProcess = this.exitCurrentProcess.bind(this);

  public constructor() {
    process.addListener('beforeExit', this.bindThisExitElectronProcess);
    process.addListener('exit', this.bindThisExitElectronProcess);
  }

  /**
   * 退出当前进程
   */
  private async exitCurrentProcess() {
    await this.exitElectronProcess();
    process.exit(0);
  }

  /**
   * 退出 electron 进程
   */
  private async exitElectronProcess() {
    return new Promise<void>((resolve, reject) => {
      if (this.state.isKillDone) return;
      if (!this.state.electronChildProcess) return resolve();
      if (typeof this.state.electronChildProcess.pid === 'undefined') return reject(new Error('electron 进程 pid 丢失'));

      // 结束 electron 进程
      treeKill(this.state.electronChildProcess.pid, 'SIGTERM', err => {
        if (err) return reject(new Error('kill electron子进程失败'));

        // 结束 kill
        this.state.isKillDone = true;
        return resolve();
      })
    })
  }

  /**
   * 退出 electron 进程
   */
  public async exit() {
    if (!this.state.electronChildProcess) return;

    if (typeof this.state.electronChildProcess.pid === 'undefined') {
      Printer.printError(`electron 进程 pid 丢失`);
      process.exit(1);
    }

    if (this.state.isKillDone) return;

    Printer.printInfo(`进行结束 electron 进程`);

    // 开始 kill
    this.state.electronChildProcess.removeListener('exit', this.bindThisExitCurrentProcess);
    await this.exitElectronProcess();
  }

  /**
   * 初始化并启动 electron 进程
   */
  protected async start(envArgs: readonly `${string}=${string | number}`[], startPath: string) {
    Printer.printInfo('启动程序');

    const envs = `cross-env ${envArgs.join(' ')}`;

    // 设置环境变量并启动 electron
    this.state.electronChildProcess = exec(`${envs} ${bin} ${startPath}`);
    this.state.electronChildProcess?.stdout?.on('data', (data) => {
      process.stdout.write(data.toString());
    });
    this.state.electronChildProcess.on('error', (err) => {
      process.stderr.write(err.toString());
    });
    this.state.electronChildProcess.on('message', (message) => {
      process.stderr.write(message.toString());
    });

    this.state.electronChildProcess.addListener('exit', this.bindThisExitCurrentProcess);
  }

  /**
   * 重启 electron 进程
   */
  public async restart(envArgs: readonly `${string}=${string | number}`[], startPath: string) {
    if (!this.state.electronChildProcess) return this.start(envArgs, startPath);

    await this.exit();
    Printer.printError(`electron 进程 kill 结束`);
    await this.start(envArgs, startPath);
  }

  /**
   * 销毁服务
   */
  public async destroy() {
    await this.exitElectronProcess();

    process.removeListener('beforeExit', this.bindThisExitElectronProcess);
    process.removeListener('exit', this.bindThisExitElectronProcess);
  }
}

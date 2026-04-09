import './bus';
import './extension';
import './native';
import './reactivity';
import './thread';
import './types';

declare global {
  /**
   * 应用程序的命名空间 - 此命名空间将为 rapid 程序 提供编写 TS 地基础
   */
  export namespace Rapid {}
}

export {};

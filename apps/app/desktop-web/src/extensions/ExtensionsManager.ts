
import { RegisterPoints } from './RegisterPoints';
import { Extension } from 'electron';

/**
 * Extensions manager
 *
 *
 *
 * 注册点：
 *    事件点
 *
 *    UI点
 *
 * 插件声明周期：
 *
 *    register
 *
 *    activate
 *
 *    unRegister
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
export class ExtensionsManager {
  private static readonly extensionsManager = new ExtensionsManager();
  constructor() { return ExtensionsManager.extensionsManager; }

  public static getInstance() { return ExtensionsManager.extensionsManager; }

  unGzipExtension(data: any): void {

  }

  installExtension(extension: Extension) {

  }

  removeExtension(extension: Extension) {

  }

  registerExtension(extension: Extension): void {


  }

  unregisterExtension(extension: Extension): void {

  }

  useRegisterPointer() {


  }
}








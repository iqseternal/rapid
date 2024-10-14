

export enum RegisterPoints {
  WorkbenchesGraphic = 'WorkbenchesGraphic',
  WorkbenchesToolbar = 'WorkbenchesToolbar'
}

export abstract class Extension {
  id: string;
  version: number;
  registerPoint: RegisterPoints;

  abstract activate(): void;
}

export enum ExtensionEvents {
  OnRegistered,

  OnActivated,

  OnUnregistered
}



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
}



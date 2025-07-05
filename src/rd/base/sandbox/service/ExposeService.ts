import { contextBridge } from 'electron';

/**
 * Expose 暴露 Api 给 Window
 */
export class ExposeService<ExposeEntries extends Record<string, any>> {

  /**
   * 自动暴露 - 通过遍历绑定对象键值, 将其暴露给 Window
   */
  public autoExpose(exposeApiObj: ExposeEntries) {
    const exposeKeys = Object.keys(exposeApiObj);

    exposeKeys.forEach(key => this.expose(key, exposeApiObj[key]));
  }


  /**
   * Expose 暴露 Api 给 Window
   */
  public expose<ExposeKey extends keyof ExposeEntries, ExposeApi extends ExposeEntries[ExposeKey]>(exposeKey: ExposeKey, api: ExposeApi) {
    if (typeof exposeKey !== 'string') return;

    if (process.contextIsolated) {
      contextBridge.exposeInMainWorld(exposeKey, api);
    }
    else {
      Reflect.set(window, exposeKey, api);
    }
  }
}

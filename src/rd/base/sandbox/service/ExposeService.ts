import { contextBridge } from 'electron';

export class ExposeService<ExposeEntries extends Record<string, any>> {


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
      window[exposeKey as string] = api;
    }
  }
}

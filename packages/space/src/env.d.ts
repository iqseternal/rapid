/// <reference types="vite/client" />

type JsonParseToBrowserWindowOptions<Windows, BrowserWindowConstructorOptions> = Omit<Json, 'windows'> & {
  windows: {
    [WindowName in keyof Windows]: {
      [WindowProperty in keyof Pick<BrowserWindowConstructorOptions, keyof Windows[WindowName]>]-?:
        // 如果出现同Key并且扩展了他的类型,那么把类型恢复过去
        Required<BrowserWindowConstructorOptions>[WindowProperty] extends Windows[WindowName][WindowProperty]
          ? BrowserWindowConstructorOptions[WindowProperty]
          : Windows[WindowName][WindowProperty];
    }
  }
};

declare module 'app.config.json' {
  import json from '#/../app.config.json';
  import type { BrowserView, BrowserWindowConstructorOptions } from 'electron';

  type Json = typeof json;
  type Windows = Json['windows'];

  export type AppJsonType = JsonParseToBrowserWindowOptions<Windows, BrowserWindowConstructorOptions>;
}

declare module 'user.config.json' {
  import json from '#/../user.config.json';
  import type { BrowserView, BrowserWindowConstructorOptions } from 'electron';

  type Json = typeof json;
  type Windows = Json['windows'];

  export type UserJsonType = JsonParseToBrowserWindowOptions<Windows, BrowserWindowConstructorOptions>;
}


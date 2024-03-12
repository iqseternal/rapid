import type { define } from '#/../vite.config.util';

type DefineProperties = ReturnType<typeof define>;

declare module '@vue/runtime-core' {

  /** 让模板里面也可以直接使用注入变量 */
  interface ComponentCustomProperties extends DefineProperties {

  }
}

export {};

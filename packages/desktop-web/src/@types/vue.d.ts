import type { defineVars } from '@rapid/config/structure';

type DefineProperties = ReturnType<typeof defineVars>;

declare module 'vue' {

  /** 让模板里面也可以直接使用注入变量 */
  interface ComponentCustomProperties extends DefineProperties {

  }
}

export {};

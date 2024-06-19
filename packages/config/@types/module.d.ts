/// <reference types="vite/client" />

declare module "*?asset" {
  const data: string;
  export default data;
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

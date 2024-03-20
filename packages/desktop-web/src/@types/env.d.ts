/// <reference types="vite/client" />

/** 声明 vite 环境变量的类型（如果未声明则默认是 any） */
declare interface ImportMetaEnv {
  readonly SPACE_API_BASE_URL: string;
  readonly SPACE_API_TIMEOUT: `${number}`;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

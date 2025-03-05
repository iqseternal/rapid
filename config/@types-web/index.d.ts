
/// <reference types="../@types" />

declare module "*.module.scss" {
  const data: Record<string, string>;
  export default data;
}

declare module "*.scss";
declare module "*.css";
declare module "*.less";

/**
 * 导入资源 URL 定位
 * @example
 * import xxxUrl from 'xxx/xx.png?raw';
 * import { namespace } from './../../packages/libs-web/common/dom';
 */
declare module "*?raw" {
  const data: string;
  export default data;
}

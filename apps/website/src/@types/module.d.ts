


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


declare module "*.module.scss" {
  const classNames: Record<string, string>;
  export default classNames;
}

declare module "*.module.less" {
  const classNames: Record<string, string>;
  export default classNames;
}

declare module "*.module.css" {
  const classNames: Record<string, string>;
  export default classNames;
}

declare module "*.scss";

declare module "*.css";

declare module "*.less";



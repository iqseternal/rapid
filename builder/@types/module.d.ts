

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

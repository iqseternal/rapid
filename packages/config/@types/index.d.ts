import type { PLATFORMS, ENV } from '../constants';
import type { PropType as VuePropType, DefineComponent } from 'vue';

declare global {
  /** 构建的平台, 具体请查看根目录 */
  declare var CURRENT_PLATFORM: PLATFORMS;

  declare var CURRENT_ENV: ENV;
}


export {};

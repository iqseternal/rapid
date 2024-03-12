
import { ENV, PLATFORMS } from '../../space/target.config';

declare const CURRENT_ENV: ENV;
declare const CURRENT_PLATFORM: PLATFORMS;

/** 当前运行环境, Bool 值 */
export const IS_DEV = CURRENT_ENV === ENV.DEV;
export const IS_PROD = CURRENT_ENV === ENV.PROD;

export const IS_WINDOWS = CURRENT_PLATFORM === PLATFORMS.WINDOWS;
export const IS_LINUX = CURRENT_PLATFORM === PLATFORMS.LINUX;
export const IS_MAC = CURRENT_PLATFORM === PLATFORMS.MAC;

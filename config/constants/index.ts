import { PlatformsOnDesktop, Env, RuntimePlatforms } from '../enums';

export { PlatformsOnDesktop, Env };

// 运行的操做系统环境
export const IS_WINDOWS = CURRENT_PLATFORM === PlatformsOnDesktop.Windows;
export const IS_MAC = CURRENT_PLATFORM === PlatformsOnDesktop.Mac;
export const IS_LINUX = CURRENT_PLATFORM === PlatformsOnDesktop.Linux;

// 是否构建运行平台
export const IS_DESKTOP = CURRENT_RUNTIME_PLATFORM === RuntimePlatforms.Desktop;
export const IS_MOBILE = CURRENT_RUNTIME_PLATFORM === RuntimePlatforms.Mobile;
export const IS_BROWSER = CURRENT_RUNTIME_PLATFORM === RuntimePlatforms.Browser;

// 当前的开发环境
export const IS_DEV = CURRENT_ENV === Env.Dev;
export const IS_PROD = CURRENT_ENV === Env.Prod;

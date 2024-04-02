
import { onErrorCaptured, reactive, watch } from 'vue';
import { printError, print } from '@suey/printer';
import { windowReload, windowRelaunch } from '@/actions';
import { IS_PROD } from '@rapid/config/constants';

/**
 * 如果 Vue 页面出现了错误，那么会在这里回调，并且关闭页面默认报错
 * 可以在这里向主进程发送信息，记录日志到本地
 */
export function useErrorCaptured() {
  // 生产模式才启用

}

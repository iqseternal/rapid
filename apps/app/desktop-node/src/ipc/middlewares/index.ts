
import { WindowService } from '@/service/WindowService';
import type { IpcActionMiddleware, EventActionType } from '@rapid/framework';

/**
 * 转换参数的中间件, 将 ipc 句柄传递的事件 e 转换为 windowService
 */
export const convertWindowService: IpcActionMiddleware<EventActionType.Handle> = {
  name: 'convertWindowService',
  transform(e, ...args) {
    const windowService = WindowService.findWindowService(e);
    return [windowService, ...args];
  }
}


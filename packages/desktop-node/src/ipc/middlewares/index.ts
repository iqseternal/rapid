
import { WindowService } from '@/service/WindowService';
import type { IpcActionMiddleware, EventActionType } from '@rapid/framework';

export const convertWindowService: IpcActionMiddleware<EventActionType.Handle> = {
  name: 'convertWindowService',
  transform(e, ...args) {
    const windowService = WindowService.findWindowService(e);
    return [windowService, ...args];
  }
}


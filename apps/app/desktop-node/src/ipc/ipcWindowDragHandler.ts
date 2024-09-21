/**
 * ====================================================================================
 * 托拽数据, 当需要做跨窗口托拽时, 可能涉及到拖拽时的数据传递, 需要主进程进行中转数据的传输
 * ====================================================================================
 */
import { screen } from 'electron';
import type { BrowserWindowConstructorOptions } from 'electron';
import { WINDOW_STATE_MACHINE_KEYS, IS_DEV } from '@rapid/config/constants';
import { isSameWindowService, WindowService, WindowStateMachine } from '@/service/WindowService';
import { RuntimeException, TypeException } from '@/core';
import { isNull, isNumber, isString, isUnDef } from '@suey/pkg-utils';
import { AppConfigService } from '@/service/AppConfigService';
import { UserConfigService } from '@/service/UserConfigService';
import { setupReportBugsWindow, setupSettingWindow } from '@/setupService';
import { toMakeIpcAction } from '@rapid/framework';
import { convertWindowService } from './middlewares';
import { PAGES_WINDOW_MAIN } from '@/config';
import { join, posix } from 'path';
import { PrinterService } from '@/service/PrinterService';

const { makeIpcHandleAction, makeIpcOnAction } = toMakeIpcAction<[WindowService]>({
  handleMiddlewares: [convertWindowService]
});

const runtimeContext = {
  dragData: {} as Record<string, any>
}

const setDragData = (dragKey: string, data: any) => {
  if (!isString(dragKey)) throw new RuntimeException(`setDragData: dragKey 不是一个 string 类型的 key`, {});
  runtimeContext.dragData[dragKey] = data;
}
const removeDragData = (dragKey: string) => {
  if (!isString(dragKey)) throw new RuntimeException(`removeDragData: dragKey 不是一个 string 类型的 key`, {});
  (runtimeContext.dragData[dragKey] = void 0);
}
const getDragData = (dragKey: string) => {
  if (!isString(dragKey)) throw new RuntimeException(`getDragData: dragKey 不是一个 string 类型的 key`, {});
  const data = runtimeContext.dragData[dragKey];
  removeDragData(dragKey);
  return data;
}

export const ipcWindowSetDragData = makeIpcHandleAction(
  'IpcWindowDrag/setDragData',
  [],
  async (windowService, options: { dragKey: string; }, data: any) => {
    const { dragKey } = options;

    setDragData(dragKey, data);
  }
)

export const ipcWindowGetDragData = makeIpcHandleAction(
  'IpcWindowDrag/getDragData',
  [],
  async (windowService, options: { dragKey: string; }) => {
    const { dragKey } = options;

    return getDragData(dragKey);
  }
)


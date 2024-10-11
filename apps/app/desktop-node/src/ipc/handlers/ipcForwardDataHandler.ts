/**
 * ====================================================================================
 * 转发暂存数据, 当需要做跨窗口数据访问时, 可以先把数据存储到这里, 然后在特定的时机, 从这里取出
 * 如果需要及时立刻取出, 应该使用 ipcBroadcast 广播 ipc
 * ====================================================================================
 */
import { WindowService } from '@/core/service/WindowService';
import { RuntimeException } from '@/core';
import { isString } from '@suey/pkg-utils';
import { toMakeIpcAction } from '@/core/ipc';
import { convertWindowServiceMiddleware } from '@/ipc/middlewares';

const { makeIpcHandleAction, makeIpcOnAction, initMakeAction } = toMakeIpcAction<[WindowService]>({
  handleMiddlewares: [convertWindowServiceMiddleware]
});

const runtimeContext = {
  forwardData: {} as Record<string, undefined | any>
}

namespace ForwardData {
  export type TakeInOptions = {

  }

  export type TakeOutOptions = {

    /**
     * 是否取回数据后, 但是依旧保留
     */
    persist?: boolean;
  }
}

const forwardDataTakeIn = (key: string, data: any) => {
  if (!isString(key)) throw new RuntimeException(`IpcForwardData:takeIn 'key' 不是一个 string 类型的 key`, {});

  runtimeContext.forwardData[key] = data;
}

const forwardDataTakeout = (key: string, options?: ForwardData.TakeOutOptions) => {
  if (!isString(key)) throw new RuntimeException(`IpcForwardData:takeout 'key' 不是一个 string 类型的 key`, {});

  const { persist = false } = options ?? {};

  const data = runtimeContext.forwardData[key];

  if (!persist) runtimeContext.forwardData[key] = void 0;
  return data;
}

export const ipcForwardDataTakeIn = makeIpcHandleAction(
  'IpcForwardData/takeIn',
  [],
  async (windowService, key: string, data: any): Promise<void> => {
    return forwardDataTakeIn(key, data);
  }
)

export const ipcForwardDataTakeOut = makeIpcHandleAction(
  'IpcForwardData/takeOut',
  [],
  async (windowService, key: string, options?: ForwardData.TakeOutOptions) => {
    return forwardDataTakeout(key, options);
  }
)

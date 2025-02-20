/**
 * ==============================================================
 *
 * 转发暂存数据, 当需要做跨窗口数据访问时, 可以先把数据存储到这里, 然后在特定的时机, 从这里取出
 * 如果需要及时立刻取出, 应该使用 ipcBroadcast 广播 ipc
 *
 * ==============================================================
 */
import { WindowService } from 'rd/base/plats/service/WindowService';
import { RuntimeException } from 'rd/base/plats/exceptions';
import { isString } from '@rapid/libs';
import { toMakeIpcAction } from '../framework';
import { convertWindowServiceMiddleware } from '../middlewares';

const { makeIpcHandleAction } = toMakeIpcAction<[WindowService]>({
  handleMiddlewares: [convertWindowServiceMiddleware]
});

const runtimeContext = {
  forwardData: {} as Record<string, undefined | any>
}

namespace ForwardData {
  /**
   * 存放数据时的函数的 options
   */
  export type TakeInOptions = {

  }

  /**
   * 取回数据的函数的 options
   */
  export type TakeOutOptions = {

    /**
     * 是否取回数据后, 但是依旧保留
     */
    persist?: boolean;
  }
}

/**
 * 登记, 将需要进行转发的数据存储到当前上下文当中
 */
const forwardDataTakeIn = (key: string, data: any, _?: ForwardData.TakeInOptions) => {
  if (!isString(key)) throw new RuntimeException(`IpcForwardData:takeIn 'key' 不是一个 string 类型的 key`, {});

  runtimeContext.forwardData[key] = data;
}

/**
 * 取出, 从转发数据中取出 key 对应的数据, 并且默认情况下, 该数据就会被带走, 不会被存在上下文当中了
 */
const forwardDataTakeout = (key: string, options?: ForwardData.TakeOutOptions) => {
  if (!isString(key)) throw new RuntimeException(`IpcForwardData:takeout 'key' 不是一个 string 类型的 key`, {});

  const { persist = false } = options ?? {};
  const data = runtimeContext.forwardData[key];

  if (!persist) runtimeContext.forwardData[key] = void 0;
  return data;
}

/**
 * ipc 接口, 渲染进程存放转发数据
 */
export const ipcForwardDataTakeIn = makeIpcHandleAction(
  'IpcForwardData/takeIn',
  [],
  async (_, key: string, data: any): Promise<void> => {
    return forwardDataTakeIn(key, data);
  }
)

/**
 * 渲染进程取回数据
 */
export const ipcForwardDataTakeOut = makeIpcHandleAction(
  'IpcForwardData/takeOut',
  [],
  async (_, key: string, options?: ForwardData.TakeOutOptions) => {
    return forwardDataTakeout(key, options);
  }
)

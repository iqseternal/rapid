/**
 * ==============================================================
 *
 * 转发暂存数据, 当需要做跨窗口数据访问时, 可以先把数据存储到这里, 然后在特定的时机, 从这里取出
 * 如果需要及时立刻取出, 应该使用 ipcBroadcast 广播 ipc
 *
 * ==============================================================
 */
import { WindowService } from 'rd/base/plats/service/WindowService';;
import { toMakeIpcAction } from '../framework';
import { convertWindowServiceMiddleware } from '../middlewares';
import { DepositService } from 'rd/base/common/service/DepositService';

const { makeIpcHandleAction } = toMakeIpcAction<[WindowService]>({
  handleMiddlewares: [convertWindowServiceMiddleware]
});

const depositService = new DepositService<Record<string, any>>();

/**
 * ipc 接口, 渲染进程存放转发数据
 */
export const ipcForwardDataTakeIn = makeIpcHandleAction(
  'IpcForwardData/takeIn',
  [],
  async (_, key: string, data: any): Promise<void> => {

    return depositService.takeIn(key, data);
  }
)

/**
 * 渲染进程取回数据
 */
export const ipcForwardDataTakeOut = makeIpcHandleAction(
  'IpcForwardData/takeOut',
  [],
  async (_, key: string, options?: DepositService.TakeOutOptions) => {

    return depositService.takeOut(key, options);
  }
)

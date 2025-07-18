export type ThreadHandler = (data: any) => (void | any);

export type ExtractThreadHandlerData<Handler extends ThreadHandler> = Parameters<Handler>[0];

export type ExtractThreadHandlerReturn<Handler extends ThreadHandler> = ReturnType<Handler>;

export interface ThreadEvent<Data> {
  /**
   * 事件句柄
   */
  readonly channel: string;

  /**
   * 事件数据, 要求可以被序列化
   */
  data: Data;
}

export class Thread<TThreadEntries extends Record<string, ThreadHandler>, SThreadEntries extends Record<string, ThreadHandler> = {}> {
  /**
   * 自身线程事件句柄
   */
  private readonly selfHandlers = new Map<string, ThreadHandler>();
  private readonly isInWebWorker  = typeof globalThis.window === 'undefined' && typeof globalThis.self !== 'undefined';

  public readonly worker?: Worker;

  public constructor(worker?: Worker) {
    if (this.isInWebWorker) {
      if (worker) throw new Error('当前环境不支持 Worker');
    }
    else {
      if (!worker) throw new Error('当前未传递 Worker');
      this.worker = worker;
    }

    this.init();
  }

  public init() {
    if (this.isInWebWorker) {
      globalThis.self.onerror = (event) => {

      }

      globalThis.self.onmessage = async (e) => {
        const event = e.data as ThreadEvent<unknown>;

        const { channel, data } = event;

        const handler = this.selfHandlers.get(channel);

        if (handler) {
          const result = await handler(data);
          this.worker?.postMessage({ channel, data: result });
        }
      }

      globalThis.self.onmessageerror = (event) => {

      }
    }
    else {
      if (this.worker) {
        this.worker.onerror = async (event) => {

        }

        this.worker.onmessage = async (e) => {
          const event = e.data as ThreadEvent<unknown>;

          const { channel, data } = event;

          const handler = this.selfHandlers.get(channel);

          if (handler) {
            const result = await handler(data);
            this.worker?.postMessage({ channel, data: result });
          }
        }

        this.worker.onmessageerror = (event) => {

        }
      }
    }
  }

  /**
   * 结束、终止 worker 的运行
   */
  public terminate() {
    this.worker?.terminate();
  }

  public send<Channel extends keyof TThreadEntries>(channel: Channel, data: ExtractThreadHandlerData<TThreadEntries[Channel]>): void {
    if (this.isInWebWorker) {
      globalThis.self.postMessage({ channel, data });
      return;
    }

    if (this.worker) {
      this.worker.postMessage({ channel, data });
    }
  }

  /**
   * 添加事件句柄
   */
  public handle<Channel extends keyof SThreadEntries>(channel: Channel, handler: SThreadEntries[Channel]) {
    this.selfHandlers.set(channel as string, handler);
  }

  /**
   * 删除事件句柄
   */
  public offHandle<Channel extends keyof SThreadEntries>(channel: Channel) {
    this.selfHandlers.delete(channel as string);
  }
}

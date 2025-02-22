
export namespace DepositService {

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
 * 转发数据的寄存器中转站
 * @example
 * const depositService = new DepositService<Record<string, any>>();
 *
 * // xx.ts
 * depositService.takeIn('foo', 'bar');
 *
 * // xxx.ts 在某个事件中
 * const value = depositService.takeOut('foo');
 */
export class DepositService<DepositEntries = unknown> {
  private readonly depositData = new Map<string | number | symbol, any>();

  /**
   * 存放数据
   */
  public takeIn<Key extends keyof DepositEntries, Data extends DepositEntries[Key]>(key: Key, data: Data, _?: DepositService.TakeInOptions) {
    this.depositData.set(key, data);
  }


  /**
   * 取回数据
   */
  public takeOut<Key extends keyof DepositEntries, Data extends DepositEntries[Key]>(key: Key, options?: DepositService.TakeOutOptions): Data | null {
    const { persist = false } = options ?? {};
    const data = this.depositData.get(key);
    if (!persist) this.depositData.delete(key);
    if (typeof data === 'undefined') return null;
    return data;
  }
}


import { toNil } from '@suey/pkg-utils';

export const enum ClockTaskConstants {
  MaxScheduleUid = 117900,
  MinScheduleUid = -117900
}

export interface ClockTaskServiceOptions {
  readonly clockTime: number;

  readonly clockTask: () => (void | Promise<void>);
}

/**
 * 时钟任务/定时任务, 每隔 xx 时间执行一次任务
 */
export class ClockTaskService {
  private timer: (undefined | ReturnType<typeof setTimeout>) = void 0;

  private scheduleUid = ClockTaskConstants.MinScheduleUid;

  public constructor(
    public readonly clockTaskOptions: ClockTaskServiceOptions
  ) { }

  /**
   * 下一个时钟任务 uid
   */
  private toNextScheduleUid() {
    const nextScheduleUid = this.scheduleUid + 1;

    if (nextScheduleUid > ClockTaskConstants.MaxScheduleUid) {
      this.scheduleUid = ClockTaskConstants.MinScheduleUid;
      return;
    }

    if (nextScheduleUid < ClockTaskConstants.MinScheduleUid) {
      this.scheduleUid = ClockTaskConstants.MaxScheduleUid;
      return;
    }

    this.scheduleUid = nextScheduleUid;
  }

  /**
   * 下一个时钟任务
   */
  private toNextSchedule() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = void 0;
    }

    this.timer = setTimeout(async () => {
      this.toNextScheduleUid();

      const scheduleUid = this.scheduleUid;

      await toNil(Promise.resolve(this.clockTaskOptions.clockTask()));
      if (scheduleUid !== this.scheduleUid) return;

      this.toNextSchedule();
    }, this.clockTaskOptions.clockTime);
  }

  /**
   * 开始时钟任务的运行
   */
  public start() {
    if (this.timer) return;

    this.toNextSchedule();
  }

  /**
   * 重启时钟任务
   */
  public restart() {
    this.stop();
    this.start();
  }

  /**
   * 立即停止当前的时钟任务
   */
  public stop() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = void 0;
    }
  }

  /**
   * 在当前任务执行之后, 停止时钟任务
   */
  public stopOnAfter() {
    this.toNextScheduleUid();
  }
}

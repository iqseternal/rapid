
/**
 * 时间戳
 */
export enum Timestamp {
  /**
   * 时间戳单位
   */
  Millisecond = 1,

  /**
   * 1 秒
   */
  Second = 1000,

  /**
   * 1 分钟
   */
  Minute = Second * 60,

  /**
   * 1 小时
   */
  Hour = Minute * 60,

  /**
   * 1 天
   */
  Day = Hour * 24,

  /**
   * 1 周
   */
  Week = Day * 7,

  /**
   * 1 月 - 30 天
   */
  Month = Day * 30,

  /**
   * 1 年 - 365 天
   */
  Year = Day * 365,

  /**
   * 1 年 - 366 天
   */
  LeapYear = Day * 366
}


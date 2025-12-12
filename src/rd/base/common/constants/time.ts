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
  HalfMinute = Minute * 0.5,

  /**
   * 1 小时
   */
  Hour = Minute * 60,
  HalfHour = Hour * 0.5,

  /**
   * 1 天
   */
  Day = Hour * 24,
  HalfDay = Day * 0.5,

  /**
   * 1 周
   */
  Week = Day * 7,
  HalfWeek = Week * 0.5,

  /**
   * 1 月 - 30 天
   */
  Month = Day * 30,
  HalfMonth = Month * 0.5,

  Month28 = Day * 28,
  Month29 = Day * 29,
  Month30 = Day * 30,
  Month31 = Day * 31,

  /**
   * 1 年 - 365 天
   */
  Year = Day * 365,
  HalfYear = Year * 0.5,

  /**
   * 1 年 - 366 天
   */
  LeapYear = Day * 366
}

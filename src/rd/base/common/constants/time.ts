

export const enum Timestamp {
  Millisecond = 1,
  Second = 1000,
  Minute = Second * 60,
  Hour = Minute * 60,
  Day = Hour * 24,
  Week = Day * 7,
  Month = Day * 30,
  Year = Day * 365,
  LeapYear = Day * 366
}


import * as path from 'path';
import * as xlsx from 'xlsx';
import * as fs from 'fs';

const enum Timestamp {
  Second = 1000,
  Minute = 60 * Timestamp.Second,
  Hour = 60 * Timestamp.Minute,
  Day = 24 * Timestamp.Hour,
  Week = 7 * Timestamp.Day,
  Month = 30 * Timestamp.Day,
  Year = 365 * Timestamp.Day,
}

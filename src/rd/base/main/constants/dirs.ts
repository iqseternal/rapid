import { app } from 'electron';

import * as fs from 'fs';
import * as path from 'path';

export const RdDirs = {

  Root: path.join(__dirname, '../../'),

  Resources: path.join(__dirname, '../../resources'),

  OutMain: __dirname,

  OutPreload: path.join(__dirname, '../reload'),

  OutRenderer: path.join(__dirname, '../renderer'),
} as const;

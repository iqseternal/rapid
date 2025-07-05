import { app } from 'electron';

import * as fs from 'fs';
import * as path from 'path';

export const RdDirs = {

  Root: path.join(__dirname, '../../'),

  Resources: path.join(__dirname, '../../resources'),

  Entries: {

    Main: __dirname,

    Preload: path.join(__dirname, '../reload'),

    Renderer: path.join(__dirname, '../renderer'),
  }
} as const;

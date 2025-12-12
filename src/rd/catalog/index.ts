import { app } from 'electron';

import * as fs from 'fs';
import * as path from 'path';

/**
 * Rd 相关目录
 */
export const RdCatalogs = {

  Root: path.join(__dirname, '../../'),

  Resources: path.join(__dirname, '../../resources'),

  Entries: {

    Main: __dirname,

    Preload: path.join(__dirname, '../reload'),

    Renderer: path.join(__dirname, '../renderer'),
  }
} as const;

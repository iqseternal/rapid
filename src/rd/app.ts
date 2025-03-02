import 'reflect-metadata';
import './process';

import { CodeMain } from 'rd/code/electron-main/main';

const code = new CodeMain();

code.main();

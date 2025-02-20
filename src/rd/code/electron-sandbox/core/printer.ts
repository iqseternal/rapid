
import { CONFIG } from '@rapid/config/constants';
import { PrinterService } from 'rd/base/plats/service/PrinterService';

const appName = CONFIG.PROJECT.toUpperCase();

/**
 * preload 线程打印器
 */
export const printer = new PrinterService(appName, 'PRELOAD');


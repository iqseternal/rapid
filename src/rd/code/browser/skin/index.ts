// import { cssVariablesPayloadSheet as presetCssVariablesPayloadSheet } from './payload';


import * as cssVariablePayloadSheet from './payload';

/**
 * @name cssVariablesPayloadSheet
 * @description scripts/skin-extract.ts 使用该变量名, 请勿修改
 * @private
 */
export const cssVariablesPayloadSheet = cssVariablePayloadSheet;

export type RdCssVariablePayloadSheet = {

  [Key in keyof typeof cssVariablePayloadSheet]: Omit<(typeof cssVariablePayloadSheet)[Key], 'value'> & {
    value: string;
  };
};



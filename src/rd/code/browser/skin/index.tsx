// import { cssVariablesPayloadSheet as presetCssVariablesPayloadSheet } from './payload';


import * as cssVariablePayloadSheet from './payload';

export const cssVariablesPayloadSheet = cssVariablePayloadSheet;

export type RdCssVariablePayloadSheet = {

  [Key in keyof typeof cssVariablePayloadSheet]: Omit<(typeof cssVariablePayloadSheet)[Key], 'value'> & {
    value: string;
  };
};



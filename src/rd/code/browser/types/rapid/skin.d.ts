import type { RdCssVariablePayloadSheet } from '@/skin';

type RdCssVariablesDeclaration = import('rd/base/browser/service/Skin').CssVariablesDeclaration<RdCssVariablePayloadSheet>;

type RdCssVars = import('rd/base/browser/service/Skin').CssVars<RdCssVariablePayloadSheet>;

declare global {
  /**
   * 皮肤相关的类型定义
   */
  export namespace Rapid.SKin {
    /**
     * 当前定义地 payload sheet
     */
    export type CssVariablePayloadSheet = RdCssVariablePayloadSheet;

    /**
     * 皮肤变量声明
     */
    export type CssVariablesDeclaration = RdCssVariablesDeclaration;

    /**
     * 皮肤变量
     */
    export type CssVars = RdCssVars;
  }
}

export {};

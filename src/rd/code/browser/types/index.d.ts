import './rapid';

declare global {

  interface Window {
    readonly native: Rapid.Native;

    readonly cssVars: Rapid.SKin.CssVars;
  }

  /**
   * 全局的 native 实例
   */
  const native: Rapid.Native;

  /**
   * 全局的皮肤变量
   */
  const cssVars: Rapid.SKin.CssVars;
}


export {};

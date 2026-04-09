import './rapid';

declare global {

  interface Window {
    readonly native: Rapid.Native;
  }

  /**
   * 全局的 native 实例
   */
  const native: Rapid.Native;
}


export {};

import type { ReactNode } from 'react';
import type { ExtensionManager, MetadataManager, Extension } from '@rapid/extensions';
import type { RdSKin } from './skin';

/**
 * 总线
 */
export namespace Bus {
  export type BusEvent = {



  }
}

export namespace Metadata {

  /**
   * 注册元数据的入口映射关系
   */
  export interface MetadataEntries {
    /**
     * 功能 - 主题 - 变量 - 转换
     */
    'functional.theme.variables.transform': ((variables: RdSKin.CssVariablesPayloadSheet) => RdSKin.CssVariablesPayloadSheet)[];



  }
}


export declare interface RApp {
  /**
   * 插件管理器
   */
  readonly extension: ExtensionManager;

  /**
   * 元数据管理器
   */
  readonly metadata: MetadataManager<Metadata.MetadataEntries>;

}

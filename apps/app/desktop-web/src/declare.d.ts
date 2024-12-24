import type { ReactNode } from 'react';
import type { ExtensionContext } from '@rapid/extensions';

export declare namespace Rapid {

  /**
   * 插件
   */
  export namespace Extension {

    export interface RegisterPoints {
      name: ExtensionContext;
    }

    export type RegisterPoint = keyof RegisterPoints;
  }

  /**
   * 总线
   */
  export namespace Bus {

    export type BusEvent = {





    }
  }
}


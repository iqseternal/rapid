import { Emitter } from './Emitter';

export type { EmitterKey, EmitterListener, EmitterListenerOffCallback, EmitterListenerSlice } from './EmitterManager';
export { EmitterManager } from './EmitterManager';

export { Emitter } from './Emitter';


export namespace Bus {
  export interface BusEvent {

    /**
     * 测试构建类型
     */
    'test': (name: string, age: number) => number;


  }
}

const bus = new Emitter<Bus.BusEvent>();

;(async () => {

  const data = bus.invoke('test', 'test', 15);




})();




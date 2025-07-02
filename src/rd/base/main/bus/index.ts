import { Invoker, Emitter } from '@rapid/libs';

export type BusInvokerEntries = {

}

export type BusEmitterEntries = {

  'rd-config-file-hot-reload': void;

}

export interface Bus {
  readonly invoker: Invoker<BusInvokerEntries>;

  readonly emitter: Emitter<BusEmitterEntries>;
}

const invoker = new Invoker<BusInvokerEntries>();

const emitter = new Emitter<BusEmitterEntries>();

export const bus: Bus = { invoker, emitter };

export default bus;

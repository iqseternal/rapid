
import type { IpcCompatibleProcessor, IpcType, IpcTypeBoth } from './definition';
import type { CutHead } from '@suey/pkg-utils';

export type MutateProcessor<T extends IpcCompatibleProcessor> = {
  channel: T['channel'];

  type: T['type'];

  args: CutHead<Parameters<T['listener']>>;

  return: Awaited<ReturnType<T['handler']>>;

  handler: (...args: CutHead<Parameters<T['handler']>>) => ReturnType<T['listener']>;
};

export type MutateProcessorSheet<PRecord extends Record<string, IpcCompatibleProcessor>> = {
  [Key in keyof PRecord as PRecord[Key]['channel']]: MutateProcessor<PRecord[Key]>;
};

export type ExtractMutateProcessorSheet<PRecord extends MutateProcessorSheet<Record<string, IpcCompatibleProcessor>>, PType extends IpcType> = {
  [
    Key in keyof PRecord as (
      PRecord[Key]['type'] extends (PType | IpcTypeBoth)
        ? Key
        : never
    )
  ]: PRecord[Key];
};

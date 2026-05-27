import { reflectx } from '@suey/pkg-utils';
import { NotHasAnyData } from './NotHasAnyData';
import { Wrong } from './Wrong';

const REmptyInstance = {};

export type EmptyType = (typeof REmptyInstance) & {
  readonly NotHasAnyData: typeof NotHasAnyData;

  readonly Wrong: typeof Wrong;
}

export const REmpty: EmptyType = REmptyInstance as EmptyType;

reflectx.defineReadonlyProperty(REmpty, 'NotHasAnyData', NotHasAnyData);
reflectx.defineReadonlyProperty(REmpty, 'Wrong', Wrong);

export default REmpty;

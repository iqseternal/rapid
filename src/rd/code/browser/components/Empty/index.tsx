
import { memo } from 'react';
import { Empty } from 'antd';

import { injectReadonlyVariable } from '@rapid/libs';

import { NotHasAnyData } from './NotHasAnyData';
import { Wrong } from './Wrong';


const REmptyInstance = memo(() => {


  return (
    <Empty>



    </Empty>
  )
})

export type EmptyType = (typeof REmptyInstance) & {
  readonly NotHasAnyData: typeof NotHasAnyData;

  readonly Wrong: typeof Wrong;
}

export const REmpty: EmptyType = REmptyInstance as EmptyType;

injectReadonlyVariable(REmpty, 'NotHasAnyData', NotHasAnyData);
injectReadonlyVariable(REmpty, 'Wrong', Wrong);

export default REmpty;

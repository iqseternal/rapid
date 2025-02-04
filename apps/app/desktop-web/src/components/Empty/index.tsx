
import { memo } from 'react';
import { Empty } from 'antd';

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

// @ts-ignore
Empty.NotHasAnyData = NotHasAnyData;
// @ts-ignore
Empty.Wrong = Wrong;

export default REmpty;

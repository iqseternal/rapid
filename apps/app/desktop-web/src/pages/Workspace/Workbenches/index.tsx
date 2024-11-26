import { memo } from 'react';
import { Card } from 'antd';

import { useSetState, useRequest } from '@rapid/libs-web';
import { toPicket } from '@rapid/libs';
import { windowWorkAreaSize } from '../../../libs/actions';

export const Workbenches = memo(() => {

  const [state, setState] = useSetState({
    name: 1,
    age: 18
  })

  return (
    <Card
      onClick={() => {
        setState({
          name: state.name + 1
        })
      }}
    >
      {state.name}


      <div>
        {state.age}
      </div>
    </Card>
  )
})

export default Workbenches;

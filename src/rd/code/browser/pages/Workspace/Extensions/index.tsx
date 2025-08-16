import { Card } from 'antd';
import { useAsyncEffect, useSetState, useShallowReactive } from '@rapid/libs-web';
import { memo } from 'react';

const Extensions = memo(() => {
  const [extensions] = rApp.extension.useExtensionsList();

  return (
    <Card>

      {extensions && extensions.map((extension, index) => {


        return (
          <div
            key={extension.name ?? extension.meta?.extension_name ?? index}
          >
            {extension.meta?.extension_name}
          </div>
        )
      })}
    </Card>
  )
})


export default Extensions;

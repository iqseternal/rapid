import { memo, useEffect, Key, useState } from 'react';
import { Button, Card, Space } from 'antd';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { useDocStore } from 'rd/code/browser/features';
import { useRefresh } from '@rapid/libs-web';
import { reactive, watch } from '@rapid/reactivity';

const Extensions = memo(() => {
  const refresh = useRefresh();

	const [extensions] = rApp.extension.useExtensionsList();

  const [state] = useState(() => {
    return reactive({
      name: 'Graphics',
      count: 0,
    })
  })

  useEffect(() => {
    const unwatch = watch(state, (value) => {
      refresh();
    });

    return () => {
      unwatch();
    }
  }, []);

	useEffect(() => {
		console.log('组件刷新了');
	})

	return (
		<Card>
			{state.count}

			<Button
				onClick={() => {
					state.count++;
				}}
			>
				Click
			</Button>
		</Card>
	)
})


export default Extensions;

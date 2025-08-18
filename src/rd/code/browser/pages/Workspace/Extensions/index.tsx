import { memo, useEffect } from 'react';
import { Button, Card } from 'antd';
import { useShallowReactive } from '@rapid/libs-web';
import { watch } from '@rapid/reactivity';

const Extensions = memo(() => {

  const [state] = useShallowReactive(() => {
    return ({
      name: 'Graphics',
      count: 0,
    })
  })

	useEffect(() => {
		const unwatch = watch(() => ({ ...state }), () => {
			console.log(
				'组件内监听：',
				state.count
			);

		});

		return () => {
			unwatch();
		}
	}, []);

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

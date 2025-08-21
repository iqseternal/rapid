import { memo, useEffect } from 'react';
import { Button, Card, Space } from 'antd';
import { useShallowReactive } from '@rapid/libs-web';
import { watch } from '@rapid/reactivity';

const Extensions = memo(() => {
	const [state] = useShallowReactive(() => {
		return ({
			name: 'Graphics',
			count: 0,
		})
	})

	return (
		<Card>
			<Space>
				<span>
					{state.count}
				</span>

				<Button
					type='primary'
					ghost
					onClick={() => {
						state.count++;
					}}
				>
					Click
				</Button>
			</Space>
		</Card>
	)
})


export default Extensions;

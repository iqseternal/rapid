import { memo } from 'react';
import { App, Button, Card, Space } from 'antd';
import { useAsyncEffect, useShallowReactive } from '@rapid/libs-web';

const Extensions = memo(() => {
	const { message } = App.useApp();

	const [state] = useShallowReactive({
		name: 'Graphics',
		count: 0,
	})

	return (
		<Card>
			<Space>
				<span>
					{ state.count }
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

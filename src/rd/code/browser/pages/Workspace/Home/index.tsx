import { memo, useEffect } from 'react';
import { Button, Card } from 'antd';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { useDocStore } from 'rd/code/browser/features';

import Guards from '@/guards';




export const Home = memo(() => {

	const docStore = useDocStore(store => store);


	return (
		<Card>
			<Button
				onClick={() => {
					useDocStore.setState({ isWork: !docStore.isWork });
				}}
			>
				切换状态
			</Button>

			<div>
				状态:
				<span>
					{docStore.isWork ? '工作中' : '休息中'}
				</span>
			</div>
		</Card>
	)
})

export default Home;


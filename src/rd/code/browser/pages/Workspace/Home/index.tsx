import { memo, useEffect, Key } from 'react';
import { Button, Card, Space } from 'antd';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { useDocStore } from 'rd/code/browser/features';

export const Home = memo(() => {

	const docStore = useDocStore(store => store);

	const [extensions] = rApp.extension.useExtensionsList();


	return (
		<Card>
			{extensions && extensions.map((extension) => {
				return (
					<div
						key={extension.name as Key}
						className='bg-blue-100 flex items-center py-2 px-2'
					>
						<Space>
							<span>
								{extension.meta?.extension_name}
							</span>
							<span>
								{extension.meta?.extension_id}
							</span>
							<span>
								{extension.meta?.extension_version_id}
							</span>
							<span>
								{extension.meta?.extension_uuid}
							</span>
						</Space>
					</div>
				)
			})}
		</Card>
	)
})

export default Home;


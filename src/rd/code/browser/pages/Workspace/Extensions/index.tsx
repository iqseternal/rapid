import { memo } from 'react';
import { App, Button, Card, Space } from 'antd';
import { useAsyncEffect, useShallowReactive } from '@rapid/libs-web';
import { toNil } from '@suey/pkg-utils';
import { useExtensionsApi } from 'rd/code/browser/api';
import { Biz, toBizErrorMsg } from 'rd/base/common/constants';

const Extensions = memo(() => {
	const { message } = App.useApp();

	const [state] = useShallowReactive({
		name: 'Graphics',
		count: 0,
	})

	useAsyncEffect(async () => {
		const [err, res] = await toNil(useExtensionsApi({
			vouchers: [
				{
					extension_id: 1,
					extension_uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
				}
			]
		}));

		if (err) {
			message.error(toBizErrorMsg(err.reason, err.reason?.message || '获取扩展失败'));
			return;
		}

		const extensionSourceList = res.data.data;

		console.log('extensionSourceList', extensionSourceList);
	}, []);

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

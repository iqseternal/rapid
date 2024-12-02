import { memo, useEffect } from 'react';
import { Tldraw } from 'tldraw';
import { FullSize } from '@rapid/libs-web';
import { Card } from 'antd';

import Guards from '@/guards';

export const Home = memo(() => {


	return (
		<Card>
			<Guards.AuthRole>
				home
			</Guards.AuthRole>
		</Card>
  )
})

export default Home;


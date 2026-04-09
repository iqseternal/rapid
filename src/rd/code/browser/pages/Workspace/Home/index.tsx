import { memo } from 'react';
import { Card } from 'antd';

import { useTranslation } from 'react-i18next';

export const Home = memo(() => {


	const { t } = useTranslation();

	return (
		<Card>
			{t('plats.widgets.control.reduction.reduction')}
		</Card>
	)
})

export default Home;


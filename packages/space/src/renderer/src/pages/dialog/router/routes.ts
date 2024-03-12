import { makeRoute } from '@libs/router';
import { terminalSvg, dashboardSvg, settingSvg } from '@renderer/assets';
import { CONFIG } from '#/constants';

import DiaLogMessage from '@pages/dialog/views/DiaLogMessage.vue';

const routes = makeRoute({
  name: 'Root',
  path: '/',
  children: [
    {
      name: CONFIG.DIALOG.INFO.NAME.toUpperCase(),
      path: CONFIG.DIALOG.INFO.NAME,
      meta: { svg: CONFIG.DIALOG.INFO.SVG },
      component: DiaLogMessage
    },
    {
      name: CONFIG.DIALOG.WARN.NAME.toUpperCase(),
      path: CONFIG.DIALOG.WARN.NAME,
      meta: { svg: CONFIG.DIALOG.WARN.SVG },
      component: DiaLogMessage
    },
    {
      name: CONFIG.DIALOG.ERROR.NAME.toUpperCase(),
      path: CONFIG.DIALOG.ERROR.NAME,
      meta: { svg: CONFIG.DIALOG.ERROR.SVG },
      component: DiaLogMessage
    }
  ]
});

export default [routes];

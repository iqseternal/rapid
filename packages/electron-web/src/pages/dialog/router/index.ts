import { createRouter, createWebHashHistory } from 'vue-router';

import routes from './routes';

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  strict: true
});

export default router;

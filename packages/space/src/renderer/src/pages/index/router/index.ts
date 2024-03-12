import { createRouter, createWebHashHistory } from 'vue-router';

import asyncGuard from './guard';
import routes from './modules';

const router = asyncGuard(createRouter({
  history: createWebHashHistory(),
  routes,
  strict: true
}));

export default router;


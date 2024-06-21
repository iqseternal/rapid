import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import { IS_WEB } from '@rapid/config/constants';

import asyncGuard from './guard';
import routes from './modules';

const router = asyncGuard(createRouter({
  history: IS_WEB ? createWebHistory() : createWebHashHistory(),
  routes,
  strict: true
}));

export default router;


import { setupApp } from '../';
import './styles.scss';

setupApp(import('./App.vue'), {}, async (app, use) => {

  const router = await use(import('./router'));

  router.isReady().then(() => {
    app.mount('#app');
  });
});

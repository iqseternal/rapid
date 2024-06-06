import { setupApp } from '..';

setupApp(import('./App.vue'), {}, async (app, use) => {

  app.mount('#app');
});

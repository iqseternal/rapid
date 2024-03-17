import '@/global';
import '@/measure';
import { setupApp } from './setupApp';
import { setupMainWindow } from './setupService';

setupApp(async () => {
  // const windowStateService = WindowStateService.getInstance();

  // windowStateService.appendMainWindow(await setupMainWindow());

  // windowStateService.startMainWindow();

  const mainWindowService = await setupMainWindow();

  mainWindowService.open();
});


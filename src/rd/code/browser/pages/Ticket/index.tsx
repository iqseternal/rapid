import { useFadeInEffect } from '@/libs/hooks';
import { App } from 'antd';
import { memo, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Header from '@/components/Header';
import WindowsMinWindowWidget from '@/plats/components/WindowsMinWindowWidget';
import WindowsCloseWindowWidget from '@/plats/components/WindowsCloseWindowWidget';

export const Ticket = memo(() => {
  const { t } = useTranslation();
  const { message, notification } = App.useApp();

  useFadeInEffect(async () => {
    await ipcActions.windowSetSize({ width: 850, height: 550 });
    await ipcActions.windowResizeAble({ resizeAble: false });
  }, []);

  useLayoutEffect(() => {
    rApp.metadata.defineMetadata('ui.layout.header.controller.widgets.close', WindowsCloseWindowWidget);
    rApp.metadata.defineMetadata('ui.layout.header.controller.widgets.min', WindowsMinWindowWidget);

    return () => {
      rApp.metadata.delMetadata('ui.layout.header.controller.widgets.close');
      rApp.metadata.delMetadata('ui.layout.header.controller.widgets.min');
    }
  }, []);

  return (
    <div className='w-full h-full relative flex flex-col bg-gradient-to-br from-blue-600 to-indigo-700'>
      <Header className='flex-none bg-transparent shadow-none' />

      <div />
    </div>
  )
});

export default Ticket;

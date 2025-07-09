import { memo, useState } from 'react';
import { toNil } from '@rapid/libs';
import { useAsyncLayoutEffect, useNormalState, useRefresh, useWindowInnerSize } from '@rapid/libs-web';
import { platControllerMaxImgUrl, platControllerReductionImgUrl } from 'rd/assets';
import { useTranslation } from 'react-i18next';

import Widget from '@/components/Widget';
import toast from 'react-hot-toast';

export const WindowsReductionWindowWidget = memo(() => {
  const refresh = useRefresh();

  const { t } = useTranslation();

  const [windowInnerSize] = useWindowInnerSize();
  const [normalState] = useNormalState(() => ({
    workAreaSize: {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }))

  const isFullSize = (
    windowInnerSize.innerWidth === normalState.workAreaSize.width &&
    windowInnerSize.innerHeight === normalState.workAreaSize.height
  );

  useAsyncLayoutEffect(async () => {
    const [err, res] = await toNil(window.ipcActions.windowWorkAreaSize());
    if (err) return;
    normalState.workAreaSize = {
      width: res.width,
      height: res.height,
    };
    refresh();
  }, []);

  return (
    <Widget
      tipText={isFullSize ? (
        t('plats.widgets.control.reduction.reduction', '还原窗口')
      ) : (
        t('plats.widgets.control.reduction.maximize', '最大化窗口')
      )}
      onClick={() => ipcActions.windowReduction()}
    >
      {isFullSize ? (
        <img
          src={platControllerReductionImgUrl}
        />
      ) : (
        <img
          src={platControllerMaxImgUrl}
        />
      )}
    </Widget>
  )
})

export default WindowsReductionWindowWidget;

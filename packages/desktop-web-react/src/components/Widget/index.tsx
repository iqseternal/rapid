
import { combinationCName } from '@rapid/libs/common';
import { Tooltip } from 'antd';
import type { IconRealKey } from '@components/IconFont';
import type { HTMLAttributes } from 'react';
import { CONFIG } from '@rapid/config/constants';

import IconFont from '@components/IconFont';
import styles from './index.module.scss';

export interface WidgetProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  icon?: IconRealKey;
  tipText?: string;
}

export default function Widget(props: WidgetProps) {
  const { hover = true, icon, tipText, className, ...realProps } = props;

  return <Tooltip
    title={tipText}
    mouseEnterDelay={CONFIG.VIEW.TOOLTIP_ENTER_TIME}
    autoAdjustOverflow
  >
    <div
      className={combinationCName(styles.widget, className, {
        [styles.widgetHasHover]: hover
      })}

      {...realProps}
    >
      {
        icon && <IconFont icon={icon}></IconFont>
      }
    </div>
  </Tooltip>
}

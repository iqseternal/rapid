import { combinationCName } from '@rapid/libs/common';
import { theme, Tooltip } from 'antd';
import type { IconRealKey } from '@components/IconFont';
import type { HTMLAttributes } from 'react';
import { CONFIG } from '@rapid/config/constants';
import { makeVar, themeCssVarsSheet, ThemeCssVarsSheet } from '@/themes';

import IconFont from '@components/IconFont';

import commonStyles from '@scss/common/index.module.scss';
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
      {...realProps}
      className={
        combinationCName(
          styles.widget,
          commonStyles.appRegionNo,
          commonStyles.flexCenter,
          className,
          {
            [styles.widgetHasHover]: hover
          }
        )
      }
    >
      {
        icon && <IconFont icon={icon}></IconFont>
      }
    </div>
  </Tooltip>
}

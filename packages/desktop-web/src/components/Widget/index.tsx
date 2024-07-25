import { combinationCName } from '@rapid/libs-web/common';
import {theme, Tooltip, TooltipProps} from 'antd';
import type { IconKey } from '@components/IconFont';
import type { HTMLAttributes } from 'react';
import { CONFIG } from '@rapid/config/constants';

import IconFont from '@components/IconFont';

import commonStyles from '@scss/common/index.module.scss';
import styles from './index.module.scss';

export interface WidgetProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  icon?: IconKey;
  tipText?: string;
  tipAttrs?: TooltipProps;
}

export default function Widget(props: WidgetProps) {
  const {
    hover = true,
    icon,
    tipText,
    className,
    tipAttrs,
    ...realProps
  } = props;

  return <Tooltip
    title={tipText}
    mouseEnterDelay={1}
    autoAdjustOverflow
    {...tipAttrs}
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

import { classnames } from '@rapid/libs-web/common';
import {theme, Tooltip, TooltipProps} from 'antd';
import type { IconKey } from '@components/IconFont';
import type { HTMLAttributes } from 'react';
import { memo } from 'react';
import { CONFIG } from '@rapid/config/constants';
import { commonStyles } from '@scss/common';

import IconFont from '@components/IconFont';
import styles from './index.module.scss';

export interface WidgetProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  icon?: IconKey;
  tipText?: string;
  tipAttrs?: TooltipProps;
}

/**
 * 展示一个控件, 控件: 图标, 附带功能提示信息和事件
 */
export const Widget = memo((props: WidgetProps) => {
  const {
    hover = true,
    icon,
    tipText,
    className,
    tipAttrs = {},
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
      className={classnames(
        styles.widget,
        commonStyles.appRegionNo,
        commonStyles.flexCenter,
        className,
        {
          [styles.widgetHasHover]: hover
        }
      )}
    >
      {
        icon && <IconFont icon={icon}></IconFont>
      }
    </div>
  </Tooltip>
})

export default Widget;

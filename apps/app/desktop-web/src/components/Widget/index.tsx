import { classnames } from '@rapid/libs-web/common';
import { theme, Tooltip, TooltipProps } from 'antd';
import type { IconKey } from '@components/IconFont';
import type { HTMLAttributes, MouseEventHandler } from 'react';
import { memo, useCallback } from 'react';
import { CONFIG } from '@rapid/config/constants';
import { commonStyles } from '@scss/common';
import { FullSize } from '@rapid/libs-web';

import IconFont from '@components/IconFont';
import styles from './index.module.scss';

export interface WidgetProps extends HTMLAttributes<HTMLDivElement> {
  /** 当前控件是否具有 hover 背景特性 */
  hover?: boolean;

  /** 当前控件展示的图标元素 */
  icon?: IconKey;

  tipText?: string;
  tipAttrs?: TooltipProps;

  /** 是否禁用当前控件 */
  disabled?: boolean;
}

/**
 * 展示一个控件, 控件: 图标, 附带功能提示信息和事件
 */
export const Widget = memo((props: WidgetProps) => {
  const {
    className,

    hover = true,

    icon,
    tipText, tipAttrs = {},

    disabled = false,

    onClick, onDoubleClick, onContextMenu,

    ...realProps
  } = props;

  /**
   * 创建维护事件, 当 disabled 为 true 时, 将传递事件进行封装, 禁用执行
   * 即便有 css commonStyles.disabledPointerEvents 的支持, 但是也要从实际的执行层面解决禁用事件问题
   */
  const withSafeEvent = useCallback((callback: MouseEventHandler<HTMLDivElement> | undefined) => {
    if (!callback) return callback;

    return (e: any) => {
      if (disabled) return;

      return callback(e);
    }
  }, [disabled]);

  const withDisabledClick = withSafeEvent(onClick);
  const withDisabledDoubleClick = withSafeEvent(onDoubleClick);
  const withDisabledContextMenu = withSafeEvent(onContextMenu);

  return <Tooltip
    title={tipText}
    mouseEnterDelay={1}
    autoAdjustOverflow
    {...tipAttrs}
  >
    <div
      className={classnames(
        styles.widget,
        className,
        commonStyles.appRegionNo,
        {
          [commonStyles.cursorNotAllowed]: disabled,
          [styles.widgetHasHover]: hover,
        }
      )}
    >
      <FullSize
        {...realProps}
        onClick={withDisabledClick}
        onDoubleClick={withDisabledDoubleClick}
        onContextMenu={withDisabledContextMenu}
        className={classnames(
          commonStyles.flexRowCenter,
          {

            [commonStyles.disabledPointerEvents]: disabled
          }
        )}
      >
        {
          icon && <IconFont icon={icon}></IconFont>
        }
      </FullSize>
    </div>
  </Tooltip>
})

export default Widget;

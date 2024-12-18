import { LoadingOutlined } from '@ant-design/icons';
import { classnames } from '@rapid/libs-web/common';
import { theme, Tooltip, TooltipProps } from 'antd';
import type { IconKey } from '@components/IconFont';
import type { HTMLAttributes, MouseEventHandler, ReactNode, MouseEvent } from 'react';
import { memo, useCallback, useState, useMemo } from 'react';
import { CONFIG } from '@rapid/config/constants';
import { commonStyles } from '@scss/common';
import { FullSize } from '@rapid/libs-web';

import IconFont from '@components/IconFont';
import styles from './index.module.scss';

export interface WidgetProps extends HTMLAttributes<HTMLDivElement> {
  /** 当前控件是否具有 hover 背景特性 */
  hasHoverStyle?: boolean;

  /** 当前控件展示的图标元素 */
  icon?: IconKey;

  /**
   * 当前控件是否处于 loading 状态
   */
  loading?: boolean;

  /**
   * 处于 loading 状态时自定义展示 loading 元素
   */
  loadingContent?: ReactNode;

  /**
   * 控件 Hover 之后展示的提示文本
   */
  tipText?: string;

  /**
   * 展示提示文本的 tooltip 的 attrs
   */
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
    hasHoverStyle = true,
    icon,
    disabled = false, loading = false, loadingContent = <LoadingOutlined />,
    tipText, tipAttrs = {},
    onClick, onDoubleClick, onContextMenu,
    ...realProps
  } = props;

  const [normalState] = useState({
    loading: false,
    disabled: false
  })

  normalState.loading = loading;
  normalState.disabled = disabled;

  /**
   * 创建维护事件, 当 disabled 为 true 时, 将传递事件进行封装, 禁用执行
   * 即便有 css commonStyles.disabledPointerEvents 的支持, 但是也要从实际的执行层面解决禁用事件问题
   */
  const withSafeEvent = useCallback(<Event extends MouseEvent>(callback: MouseEventHandler<HTMLDivElement> | undefined) => {
    if (!callback) return callback;

    return (e: Event): void => {
      if (normalState.disabled) return;
      if (normalState.loading) return;
      return callback(e as any);
    }
  }, []);

  const withDisabledClick = useMemo(() => withSafeEvent<MouseEvent<HTMLDivElement>>(
    onClick
  ), [onClick]);
  const withDisabledDoubleClick = useMemo(() => withSafeEvent<MouseEvent<HTMLDivElement>>(
    onDoubleClick
  ), [onDoubleClick]);
  const withDisabledContextMenu = useMemo(() => withSafeEvent<MouseEvent<HTMLDivElement>>(
    onContextMenu
  ), [onContextMenu]);

  return <Tooltip
    title={tipText}
    mouseEnterDelay={0.5}
    autoAdjustOverflow
    {...tipAttrs}
  >
    <div
      className={classnames(
        styles.widget,
        className,
        commonStyles.appRegionNo,
        {
          [commonStyles.cursorNotAllowed]: loading || disabled,
          [styles.widgetHasHover]: !loading && hasHoverStyle,
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
            [commonStyles.disabledPointerEvents]: loading || disabled
          }
        )}
      >
        {loading ? loadingContent : <>
          {icon && <IconFont icon={icon}></IconFont>}
        </>}
      </FullSize>
    </div>
  </Tooltip>
})

export default Widget;

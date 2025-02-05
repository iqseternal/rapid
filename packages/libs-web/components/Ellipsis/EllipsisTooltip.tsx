import { Popover, PopoverProps, Tooltip, TooltipProps } from 'antd';
import type { ReactElement, ReactNode } from 'react';
import { useEffect, useMemo, useRef, memo, isValidElement } from 'react';
import { classnames } from '../../common';
import { useDebounceHook, useResizeObserver, useShallowReactive } from '../../hooks';
import { isRawObject, isString, isUndefined, isUnDef } from '@rapid/libs';
import { StringFilters } from '../../filters';

import { EllipsisBase } from './EllipsisBase';
import type { EllipsisProps } from './EllipsisBase';


/**
 * Ellipsis 以 tooltip 为展示容器的 props
 *
 */
export interface EllipsisTooltipProps extends Omit<EllipsisProps, 'overlayRender'> {
  /**
   * tooltip 的 attrs
   */
  tipAttrs?: TooltipProps;
}

/**
 * 自动检测内容是否溢出, 如果溢出展示 Tooltip
 *
 * @example
 *
 * <div style={{ width: '100px' }}>
 *   <Ellipsis.Tooltip>
 *     hello world ....................
 *   </Ellipsis.Tooltip>
 * </div>
 */
export const EllipsisTooltip = memo((props: EllipsisTooltipProps) => {
  const { tipAttrs, children, ...realProps } = props;

  return <EllipsisBase
    overlayRender={(realContent) => {

      return <Tooltip

        overlay={<>{children}</>}
        autoAdjustOverflow
        {...tipAttrs}
      >
        {realContent}
      </Tooltip>
    }}
    children={children}
    {...realProps}
  />
})

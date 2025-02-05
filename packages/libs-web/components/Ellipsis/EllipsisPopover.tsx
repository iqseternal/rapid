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
 * Ellipsis 以 popover 为展示容器的 props
 */
export interface EllipsisPopoverProps extends Omit<EllipsisProps, 'overlayRender'> {

  /**
   * popover 的 attrs
   */
  tipAttrs?: PopoverProps;
}

/**
 * 自动检测内容是否溢出, 如果溢出展示 Popover
 *
 * @example
 *
 * <div style={{ width: '100px' }}>
 *   <Ellipsis.Popover>
 *     hello world ....................
 *   </Ellipsis.Popover>
 * </div>
 */
export const EllipsisPopover = memo((props: EllipsisPopoverProps) => {
  const { tipAttrs, children, ...realProps } = props;

  return <EllipsisBase
    overlayRender={(realContent) => {
      return <Popover
        overlay={<>{children}</>}
        autoAdjustOverflow
        {...tipAttrs}
      >
        {realContent}
      </Popover>
    }}
    children={children}
    {...realProps}
  />
})

import { Popover, PopoverProps } from 'antd';
import { memo } from 'react';
import type { ReactNode } from 'react';

import { EllipsisBase } from './EllipsisBase';
import type { EllipsisProps } from './EllipsisBase';

/**
 * Ellipsis 以 popover 为展示容器的 props
 */
export interface EllipsisPopoverProps extends Omit<EllipsisProps, 'overlayRender'> {

  /**
   * popover 的 attrs
   */
  readonly tipAttrs?: PopoverProps;
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

  const overlayRender = (realContent: ReactNode) => {

    return (
      <Popover
        overlay={children}
        autoAdjustOverflow
        {...tipAttrs}
      >
        {realContent}
      </Popover>
    )
  }

  return (
    <EllipsisBase
      overlayRender={overlayRender}
      children={children}
      {...realProps}
    />
  )
})

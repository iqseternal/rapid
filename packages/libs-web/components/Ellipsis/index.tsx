import { Popover, PopoverProps, Tooltip, TooltipProps } from 'antd';
import type { ReactElement, ReactNode } from 'react';
import { useEffect, useMemo, useRef, memo, isValidElement } from 'react';
import { classnames } from '../../common';
import { useDebounceHook, useResizeObserver, useShallowReactive } from '../../hooks';
import { isRawObject, isString, isUndefined } from '@rapid/libs';
import { StringFilters } from '../../filters';

import styles from './index.module.scss';

export namespace EllipsisTypes {
  /**
   * Ellipsis props
   */
  export interface EllipsisProps {
    children?: ReactNode;

    className?: string;

    /**
     * 如果传递的 children 展示为空时, 展示的默认字符串
     */
    defaultContent?: string;

    /**
     * 如果 children 字符串的内容超过了父容器, 那么就因该显示省略号, 同时 hover 应该展示完全内容
     *
     * 这个函数就是当超出父容器之后, 应该如何展示当前元素. 一般情况下：
     *
     * 使用 Tooltip 或者 Popover 来包裹 children 即可.
     *
     * 默认是: Tooltip
     */
    overlayRender?: (children: ReactNode) => ReactElement;


    /**
     * tooltip 的 attrs, 默认为 tooltip
     */
    tipAttrs?: TooltipProps;
  }

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
   * Ellipsis 以 popover 为展示容器的 props
   */
  export interface EllipsisPopoverProps extends Omit<EllipsisProps, 'overlayRender'> {

    /**
     * popover 的 attrs
     */
    tipAttrs?: PopoverProps;
  }
}

/**
 * 自动检测内容是否溢出, 如果溢出展示 Tooltip
 */
const EllipsisBase = memo((props: EllipsisTypes.EllipsisProps) => {
  const {
    className,
    children, defaultContent = '-',
    tipAttrs = {},
    overlayRender = (realContent) => {
      return <Tooltip
        autoAdjustOverflow
        overlay={<>{children}</>}
        {...tipAttrs}
      >
        {realContent}
      </Tooltip>;
    }
  } = props;

  if (isUndefined(children)) return <></>;

  const [state] = useShallowReactive({
    // 当前内容是否溢出了容器
    isOverflow: false
  })

  // 文本容器
  const textContainerRef = useRef<HTMLDivElement>(null);

  // 真实内容
  const realContent = useMemo(() => {
    if (isRawObject(children)) {
      if (isValidElement(children)) return children;
      return defaultContent;
    }

    if (isString(children)) return StringFilters.toValidStr(children, defaultContent);
    return defaultContent;
  }, [children, defaultContent]);

  // 创建 resizeObserver, 添加调整尺寸时的侦听器
  const [resizeObserver] = useResizeObserver(textContainerRef, useDebounceHook(() => {
    const container = textContainerRef.current;

    if (container) {
      // 设置是否溢出
      const isOverflow = container.scrollWidth > container.clientWidth || container.scrollHeight > container.clientHeight;

      if (isOverflow === state.isOverflow) return;
      state.isOverflow = isOverflow;
    }
  }, 200));

  // 启动 observer
  useEffect(() => {
    resizeObserver.observe(textContainerRef.current!);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return useMemo(() => {
    const element = <div
      ref={textContainerRef}
      className={classnames(styles.wFullSize, styles.textOverflow, className)}
    >
      {realContent}
    </div>

    if (!state.isOverflow) return element;

    return overlayRender(element);
  }, [state.isOverflow, realContent, className]);
})

/**
 * 自动检测内容是否溢出, 如果溢出展示 Tooltip
 */
const EllipsisTooltip = memo((props: EllipsisTypes.EllipsisTooltipProps) => {
  const { tipAttrs, ...realProps } = props;

  return <EllipsisBase
    overlayRender={(children) => {

      return <Tooltip

        overlay={<>{children}</>}
        autoAdjustOverflow
        {...tipAttrs}
      >
        {children}
      </Tooltip>
    }}
    {...realProps}
  />
})

/**
 * 自动检测内容是否溢出, 如果溢出展示 Popover
 */
const EllipsisPopover = memo((props: EllipsisTypes.EllipsisPopoverProps) => {
  const { tipAttrs, ...realProps } = props;

  return <EllipsisBase
    overlayRender={(children) => {
      return <Popover
        overlay={<>{children}</>}
        autoAdjustOverflow
        {...tipAttrs}
      >
        {children}
      </Popover>
    }}
    {...realProps}
  />
})

export type EllipsisType = typeof EllipsisBase & {
  Tooltip: typeof EllipsisTooltip;
  Popover: typeof EllipsisPopover;
};

export const Ellipsis = EllipsisBase as EllipsisType;

Ellipsis.Tooltip = EllipsisTooltip;
Ellipsis.Popover = EllipsisPopover;

export default Ellipsis;

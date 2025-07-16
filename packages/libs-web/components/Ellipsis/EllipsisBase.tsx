import { Tooltip, TooltipProps } from 'antd';
import type { ReactElement, ReactNode } from 'react';
import { useEffect, useMemo, useRef, memo, isValidElement } from 'react';
import { classnames } from '../../common';
import { useDebounceHook, useResizeObserver, useShallowReactive } from '../../hooks';
import { isRawObject, isUnDef } from '@rapid/libs';
import { StringFilters } from '../../common';

import styles from './ellipsis.module.scss';

/**
 * Ellipsis props
 */
export interface EllipsisProps {
  readonly children?: ReactNode;

  readonly className?: string;

  /**
   * 如果传递的 children 展示为空时, 展示的默认字符串
   */
  readonly defaultContent?: string;

  /**
   * 如果 children 字符串的内容超过了父容器, 那么就因该显示省略号, 同时 hover 应该展示完全内容
   *
   * 这个函数就是当超出父容器之后, 应该如何展示当前元素. 一般情况下：
   *
   * 使用 Tooltip 或者 Popover 来包裹 children 即可.
   *
   * 默认是: Tooltip
   */
  readonly overlayRender?: (children: ReactNode) => ReactElement;

  /**
   * tooltip 的 attrs, 默认为 tooltip
   */
  readonly tipAttrs?: TooltipProps;
}

/**
 * 自动检测内容是否溢出, 如果溢出展示 Tooltip
 *
 * @example
 *
 * <div style={{ width: '100px' }}>
 *   <Ellipsis>
 *     hello world ....................
 *   </Ellipsis>
 * </div>
 *
 * @example
 *
 * <div style={{ width: '100px' }}>
 *   <Ellipsis.Tooltip>
 *     hello world ....................
 *   </Ellipsis.Tooltip>
 * </div>
 *
 * @example
 *
 * <div style={{ width: '100px' }}>
 *   <Ellipsis.Popover>
 *     hello world ....................
 *   </Ellipsis.Popover>
 * </div>
 */
export const EllipsisBase = memo((props: EllipsisProps) => {
  const {
    className,
    children,
    defaultContent = '-',
    tipAttrs = {},
    overlayRender = (realContent) => {
      return (
        <Tooltip
          autoAdjustOverflow
          overlay={<>{children}</>}
          {...tipAttrs}
        >
          {realContent}
        </Tooltip>
      )
    }
  } = props;

  if (isUnDef(children)) return null;

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

    return StringFilters.toValidStr(children.toString(), defaultContent);
  }, [children, defaultContent]);

  const resizeObserverCallback = useMemo(() => {
    const callback = () => {
      const container = textContainerRef.current;

      if (container) {
        // 设置是否溢出
        const isOverflow = container.scrollWidth > container.clientWidth || container.scrollHeight > container.clientHeight;

        if (isOverflow === state.isOverflow) return;
        state.isOverflow = isOverflow;
      }
    }

    return useDebounceHook(callback, { wait: 200 });
  }, []);

  // 创建 resizeObserver, 添加调整尺寸时的侦听器
  const [resizeObserver] = useResizeObserver(textContainerRef, resizeObserverCallback, []);

  // 启动 observer
  useEffect(() => {
    if (!textContainerRef.current) return;

    resizeObserver.observe(textContainerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const element = (
    <div
      ref={textContainerRef}
      className={classnames(styles.wFullSize, styles.textOverflow, className)}
    >
      {realContent}
    </div>
  );

  if (!state.isOverflow) return element;
  return overlayRender(element);
})


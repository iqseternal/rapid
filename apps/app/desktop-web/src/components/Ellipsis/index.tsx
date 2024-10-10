import { Popover, PopoverProps, Tooltip, TooltipProps } from 'antd';
import type { ReactNode } from 'react';
import { useEffect, useMemo, useRef, useState, memo } from 'react';
import { classnames } from '@rapid/libs-web/common';
import { useDebounceHook, useResizeObserver, useShallowReactive } from '@rapid/libs-web/hooks';
import { commonStyles } from '@scss/common';
import { isDef } from '@suey/pkg-utils';
import { StringFilters } from '@rapid/libs-web';

export interface EllipsisProps extends BaseProps {
  children: string | number | boolean;

  defaultContent?: string;

  tipAttrs?: TooltipProps;
}

/**
 * 自动检测内容是否溢出, 如果溢出展示 Popover
 */
export const Ellipsis = memo((props: EllipsisProps) => {
  const {
    className, children,

    defaultContent = '',

    tipAttrs = {}

  } = props;

  const [state] = useShallowReactive({
    // 当前内容是否溢出了容器
    isOverflow: false
  })

  // 文本容器
  const textRef = useRef<HTMLDivElement>(null);

  // 真实内容
  const realContent = useMemo(() => {
    if (isDef(children)) return StringFilters.toValidStr(children.toString(), defaultContent);

    return StringFilters.toValidStr('', defaultContent);
  }, [children, defaultContent]);

  // 创建 resizeObserver, 添加调整尺寸时的侦听器
  const [resizeObserver] = useResizeObserver(textRef, useDebounceHook(() => {
    const element = textRef.current;
    if (element) {
      // 设置是否溢出
      const isOverflow = element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight;

      if (isOverflow === state.isOverflow) return;
      state.isOverflow = isOverflow;
    }
  }, 200));

  // 启动 observer
  useEffect(() => {
    resizeObserver.observe(textRef.current!);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return <Tooltip
    autoAdjustOverflow
    overlayClassName={classnames({
      // 如果没有溢出, 那么隐藏 Tooltip 元素
      [commonStyles.hidden]: !state.isOverflow
    })}
    {...tipAttrs}
  >
    <div
      ref={textRef}
      className={classnames(
        commonStyles.wFullSize,
        commonStyles.textOverflow,
        className
      )}
    >
      {realContent}
    </div>
  </Tooltip>
})

export default Ellipsis;

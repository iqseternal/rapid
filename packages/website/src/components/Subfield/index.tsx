import type { CSSObject } from 'styled-components';
import type { CSSProperties } from 'react';
import { FlexRowBetween, FlexColumnBetween } from '@rapid/libs-web/styled';
import { isString } from '@suey/pkg-utils';

interface SubfieldProps extends BaseProps {
  slots?: {
    start?: React.ReactNode;
    center?: React.ReactNode;
    end?: React.ReactNode;
  }
  size?: number;
  gap?: string | number;
};

/**
 * 生产占位符的组件
 * @param param0
 * @returns
 */
export function SubfieldSpace({ size = 1, children = '' as React.ReactNode, style = {} as CSSObject, className = '' }) {
  return <div className={className} style={{ flex: size, ...style }}>{children}</div>;
}

/**
 * space-between 的样式, 通过加入占位符来布局内容
 * @param param0
 * @returns
 */
export function SubfieldRow({ children, slots, style, className, size, gap = '0px' }: SubfieldProps) {
  const styles: CSSProperties = {
    ...style,
    flex: size
  };

  if (gap) {
    if (isString(gap) && parseInt(gap as string) !== 0) {
      styles.gap = gap;
    }
    else styles.gap = gap + 'px';
  }


  if (children) return <FlexRowBetween className={className} style={styles}>{children}</FlexRowBetween>

  return <FlexRowBetween className={className} style={styles}>
    {slots?.start && <FlexRowBetween>{slots.start}</FlexRowBetween>}
    {slots?.center && <FlexRowBetween>{slots.center}</FlexRowBetween>}
    {slots?.end && <FlexRowBetween>{slots.end}</FlexRowBetween>}
  </FlexRowBetween>
}

/**
 * space-between 的样式, 通过加入占位符来布局内容
 * @param param0
 * @returns
 */
export function SubfieldCloumn({ children, slots, style, className, size, gap = '0px' }: SubfieldProps) {
  const styles: CSSProperties = {
    ...style,
    flex: size
  };

  if (gap) {
    if (isString(gap) && parseInt(gap as string) !== 0) {
      styles.gap = gap;
    }
    else styles.gap = gap + 'px';
  }

  if (children) return <FlexColumnBetween className={className} style={styles}>{children}</FlexColumnBetween>

  return <FlexColumnBetween className={className} style={styles}>
    {slots?.start && <FlexColumnBetween>{slots.start}</FlexColumnBetween>}
    {slots?.center && <FlexColumnBetween>{slots.center}</FlexColumnBetween>}
    {slots?.end && <FlexColumnBetween>{slots.end}</FlexColumnBetween>}
  </FlexColumnBetween>
}

export const Subfield = SubfieldRow;

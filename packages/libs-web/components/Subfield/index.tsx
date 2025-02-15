import type { ReactNode, HTMLAttributes, CSSProperties } from 'react';
import { forwardRef, memo } from 'react';
import { classnames } from '../../common';
import { inject } from '@rapid/libs/inject';

import styles from './index.module.scss';

export namespace SubfieldTypes {
  /**
   * subfield 布局方式
   */
  export interface SubfieldProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;

    /**
     * 容器 CSS 类名
     */
    className?: string;

    /**
     * 布局方向
     */
    direction?: 'horizontal' | 'vertical';

    /**
     * 主轴分散方式, 默认为: space-between
     */
    justifyContent?: CSSProperties['justifyContent'];

    /**
     * 次轴布局方式, 默认为: center
     */
    alignItems?: CSSProperties['alignItems'];

    /**
     * 间距: [主轴间距, 次轴间距]
     */
    gap?: [number?, number?];
  }

  /**
   * subfield 实例 ref 的类型
   */
  export interface SubfieldInstance extends HTMLDivElement {

  }

  /**
   * Fixed 组件的 props
   */
  export interface FixedProps extends HTMLAttributes<HTMLDivElement> {

  }

  /**
   * Auto 组件的 props
   */
  export interface AutoProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * flex 属性
     */
    flex?: CSSProperties['flex'];
  }
}

/**
 * flex: space-between 布局容器, 快速三栏布局
 */
const SubfieldBase = memo(forwardRef<SubfieldTypes.SubfieldInstance, SubfieldTypes.SubfieldProps>((props, ref) => {
  const { className, direction = 'horizontal', justifyContent, alignItems, gap = [], ...realProps } = props;

  const [colGap, rowGap] = gap;

  return <div
    ref={ref}
    className={classnames(
      className,
      styles.subfield,
      {
        [styles.flexRow]: direction === 'horizontal',
        [styles.flexCol]: direction === 'vertical'
      }
    )}
    style={{
      rowGap,
      columnGap: colGap,
      justifyContent,
      alignItems
    }}
    {...realProps}
  />
}));

/**
 * flex: space-between 布局容器, 但自身大小不随着 flex 变化, flex: none;
 */
const SubfieldFixed = memo(forwardRef<SubfieldTypes.SubfieldInstance, SubfieldTypes.SubfieldProps>((props, ref) => {
  const { className, ...realProps } = props;

  return <Subfield
    ref={ref}
    className={classnames(className, styles.subfieldFixed)}
    {...realProps}
  />
}));

/**
 * flex: none; 的普通 div
 *
 */
const Fixed = memo(forwardRef<HTMLDivElement, SubfieldTypes.FixedProps>((props, ref) => {
  const { className, ...realProps } = props;

  return <div
    ref={ref}
    className={classnames(className, styles.flexFixed)}
    {...realProps}
  />
}))

/**
 * flex: 1 1 auto; 的普通 div
 */
const Auto = memo(forwardRef<HTMLDivElement, SubfieldTypes.AutoProps>((props, ref) => {
  const { className, flex, ...realProps } = props;

  return <div
    ref={ref}
    className={classnames(className, styles.flexAuto)}
    style={{
      flex
    }}
    {...realProps}
  />
}))

export type SubfieldType = typeof SubfieldBase & {
  readonly SubfieldFixed: typeof SubfieldFixed;
  readonly Fixed: typeof Fixed;
  readonly Auto: typeof Auto;
};

export const Subfield = SubfieldBase as SubfieldType;

inject(Subfield, 'Fixed', Fixed);
inject(Subfield, 'Auto', Auto);
inject(Subfield, 'SubfieldFixed', SubfieldFixed);

export default Subfield;

import type { FC, ReactNode, HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import {combinationCName, CssValueConverts} from '../../common';
import styles from './index.module.scss';

export interface SubfieldProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;

  className?: string;

  gap?: number;
}

export interface SubfieldInstance extends HTMLDivElement {

}

/**
 * flex: space-between
 */
export const Subfield = forwardRef<SubfieldInstance, SubfieldProps>((props, ref) => {
  const { className, ...realProps } = props;

  return <div

    ref={ref}
    className={combinationCName(className, styles.subfield)}
    {...realProps}
  />
})

export const SubfieldFixed = forwardRef<SubfieldInstance, SubfieldProps>((props, ref) => {

  const { className, ...realProps } = props;

  return <Subfield
    ref={ref}
    className={combinationCName(className, styles.subfieldFixed)}
    {...realProps}
  />
})

export default Subfield;

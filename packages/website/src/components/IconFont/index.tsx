import { combinationCName } from '@libs/common';
import type { FC } from 'react';
import styles from './index.module.scss';
import * as icons from '@ant-design/icons';

export default function IconFont(props: BaseProps & { type: IconRealKey;size?: number; }) {
  const Icon = icons[props.type] as (typeof icons)['AccountBookFilled'];

  return <Icon
    {...props}
    style={props.size ? { width: props.size + 'px', height: props.size + 'px' } : {}}
    className={combinationCName(props.className, styles.iconFont)}
  >

  </Icon>;
}


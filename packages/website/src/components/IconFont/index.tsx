
import { combinationCName } from '@libs/common';

import * as icons from '@ant-design/icons';
import styles from './index.module.scss';

export default function IconFont(props: BaseProps & { type: IconRealKey;size?: number; }) {
  const Icon = icons[props.type];

  return <Icon
    {...props}
    style={props.size ? { width: props.size + 'px', height: props.size + 'px' } : {}}
    className={combinationCName(props.className, styles.iconFont)}
  >

  </Icon>;
}


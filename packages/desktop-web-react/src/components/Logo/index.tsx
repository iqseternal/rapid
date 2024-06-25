
import { iconUrl } from '@rapid/config/electron-web';
import type { HTMLAttributes } from 'react';

import styles from './index.module.scss';
import { combinationCName } from '@rapid/libs/common';


export interface LogoProps extends HTMLAttributes<HTMLDivElement> {

  alt?: string;
}

export default function Logo(props: LogoProps) {
  const { className, alt, children, ...realProps } = props;

  return <div
    className={combinationCName(styles.logo, className)}

    {...realProps}
  >
    <img src={iconUrl} alt={alt} />
  </div>;
}

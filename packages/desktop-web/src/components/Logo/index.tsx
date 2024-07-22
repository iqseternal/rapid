import { iconUrl } from '@rapid/config/electron-web';
import type { HTMLAttributes } from 'react';
import { combinationCName } from '@rapid/libs-web/common';

import styles from './index.module.scss';

export interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;

  alt?: string;
}

export default function Logo(props: LogoProps) {
  const {
    className,
    src = iconUrl,
    alt,
    children,
    ...realProps
  } = props;

  return <div
    className={combinationCName(styles.logo, className)}
    {...realProps}
  >
    <img src={src} alt={alt} />
  </div>;
}

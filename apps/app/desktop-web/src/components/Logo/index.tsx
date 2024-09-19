import type { HTMLAttributes } from 'react';
import { classnames } from '@rapid/libs-web/common';

import { default as iconUrl } from '../../../../resources/icon.png?raw';

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
    className={classnames(styles.logo, className)}
    {...realProps}
  >
    <img src={src} alt={alt} />
  </div>;
}

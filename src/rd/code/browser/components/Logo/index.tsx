import type { HTMLAttributes } from 'react';
import { memo } from 'react';
import { classnames } from '@rapid/libs-web/common';

import { default as iconUrl } from '../../../../resources/icon.png?raw';

export interface LogoProps {
  src?: string;

  alt?: string;

  className?: string;
}

export const Logo = memo((props: LogoProps) => {
  const { className, src = iconUrl, alt, ...realProps } = props;

  return (
    <div
      className={classnames(className, 'max-w-full max-h-full w-full aspect-square')}
      {... realProps}
    >
      <img
        className='w-full h-full aspect-square scale-[0.6] object-contain'
        src={src}
        alt={alt}
      />
    </div>
  )
});

export default Logo;

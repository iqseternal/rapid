import type { HTMLAttributes } from 'react';
import { memo } from 'react';
import { classnames } from '@rapid/libs-web/common';
import { iconPngUrl } from 'rd/assets';

export interface LogoProps {
  src?: string;

  alt?: string;

  className?: string;
}

export const Logo = memo((props: LogoProps) => {
  const { className, src = iconPngUrl, alt, ...realProps } = props;

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

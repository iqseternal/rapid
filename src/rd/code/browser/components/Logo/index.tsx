import type { CSSProperties, HTMLAttributes } from 'react';
import { memo } from 'react';
import { classnames } from '@rapid/libs-web/common';
import { iconPngUrl } from 'rd/assets';

export interface LogoProps {
  className?: string;

  style?: CSSProperties;
}

export const Logo = memo((props: LogoProps) => {
  const { className, style, ...realProps } = props;

  return (
    <div
      className={classnames(className, 'max-w-full max-h-full w-full aspect-square')}
      {... realProps}
      style={{
        filter: 'drop-shadow(3px 0px 2px rgba(0, 0, 0, 0.4))',
        ...style
      }}
    >
      <img
        className='w-full h-full aspect-square scale-[0.6] object-contain'
        src={iconPngUrl}
        alt='Rapid'
      />
    </div>
  )
});

export default Logo;

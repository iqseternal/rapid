
import { isUnDef } from '@suey/pkg-utils';
import { Image, ImageProps } from 'antd';
import { useEffect, useState, forwardRef } from 'react';
import { MaxScreenWidth, MaxScreenHeight } from '@/styled';

import styles from './index.module.scss';
import { combinationCName } from '@libs/common';

export interface GradualImgProps extends ImageProps {

  preSrc?: string;

  src: string;

  imgClassName?: string;
}

const GradualImg = forwardRef<HTMLDivElement, GradualImgProps>((props, ref) => {
  const [src, setSrc] = useState(props.preSrc ?? props.src);

  useEffect(() => {
    if (isUnDef(props.src)) return;

    const i = new window.Image();

    i.src = props.src as string;

    i.onload = () => {
      setSrc(props.src);
    }
  }, []);

  const realProps = {
    preview: false,
    ...props,
    preSrc: void 0,
    src: void 0
  };

  delete realProps.preSrc;
  delete realProps.imgClassName;
  delete realProps.style;

  return <MaxScreenWidth ref={ref} className={combinationCName(styles.gradualImg, props.className)} style={props.style}>
    <Image
      width={'100%'}
      {...realProps}
      className={props.imgClassName}
      src={src}
    />
  </MaxScreenWidth>
});

export default GradualImg;

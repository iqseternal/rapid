import { isUnDef } from '@rapid/libs';
import { Image, ImageProps } from 'antd';
import { useEffect, useState, forwardRef } from 'react';
import { MaxScreenWidth, MaxScreenHeight } from '@rapid/libs-web/styled';
import { classnames } from '@libs/common';
import styles from './index.module.scss';

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

  return <MaxScreenWidth ref={ref} className={classnames(styles.gradualImg, props.className)} style={props.style}>
    <Image
      width={'100%'}
      {...realProps}
      className={props.imgClassName}
      src={src}
    />
  </MaxScreenWidth>
});

export default GradualImg;

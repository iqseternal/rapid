import { useState, useContext, useRef, useEffect } from 'react';
import { autoGetScrollContainer } from '@libs/dom';
import { useEventListener, useReactive, useDebounceHook } from '@/hooks';
import { combinationCName } from '@libs/common';
import { combinationStyled } from '@rapid/libs-web/styled';
import type { GradualImgProps } from '@components/GradualImg';

import GradualImg from '@components/GradualImg';
import styles from './parallaxContainer.module.scss';

export interface ParallaxContainerProps extends BaseProps {
  bgSrc?: string;

  isFirst?: boolean;
}

/**
 * 视差组件，但是实现需要使用到 position absolute，所以不通用
 * @param props
 * @returns
 */
export function ParallaxContainer(props: ParallaxContainerProps) {
  // 写js的是因为内容默认放到了上面，为了不影响后续的元素，所以最上面的元素需要写一个marginTop，并且要根据传递的内容来确定大小

  const [state] = useReactive({
    firstMarginTop: 0
  });
  const contentContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!props.isFirst) return;
    if (!contentContainer.current) return;

    state.firstMarginTop = contentContainer.current.getBoundingClientRect().height / 2;
  }, []);

  useEventListener(window, 'resize', useDebounceHook(() => {
    if (!props.isFirst) return;
    if (!contentContainer.current) return;

    state.firstMarginTop = contentContainer.current.getBoundingClientRect().height / 2;
  }));


  return <div className={combinationCName(styles.parallaxContainer, props.className)} style={props.isFirst ? { marginTop: state.firstMarginTop + 'px' } : {}}>
    <div
      style={{ backgroundImage: `url('${props.bgSrc}')` }}
      className={combinationCName(styles.parallaxBackground)}
    />

    <div ref={contentContainer} className={combinationCName(styles.parallaxContentContainer)}>

      <div className={combinationCName(styles.parallaxContent)}>{props.children}</div>
    </div>
  </div>;
}




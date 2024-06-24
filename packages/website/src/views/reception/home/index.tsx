import type { FC } from 'react';
import { SubfieldCloumn, Subfield, SubfieldSpace } from '@components/Subfield';
import { Parallax } from 'react-parallax';
import { productionPreviewUrl, homeImages } from '@/assets';
import { isDef } from '@suey/pkg-utils';
import { FlexRow, combinationStyled } from '@/styled';
import { Space } from 'antd';
import { ScrollParallax } from 'react-just-parallax';
import type { CSSObject } from 'styled-components';
import { CONFIG } from '@rapid/config/constants';
import { useState, useContext, useRef, useEffect } from 'react';
import { autoGetScrollContainer } from '@libs/dom';
import { useEventListener, useReactive, useDebounceHook } from '@/hooks';
import { combinationCName } from '@libs/common';
import type { GradualImgProps } from '@components/GradualImg';

import styles from './index.module.scss';
import IconFont from '@components/IconFont';
import GradualImg from '@components/GradualImg';
import Prepose from '@/layout/ReceptionLayout/Prepose';
import BlendedText from '@components/BlendedText';
import Caption from './components/Caption';
import Logo from '@components/Logo';

const BlendedTextField: FC<BaseProps> = (props) => {
  return <Subfield style={{ width: '100%' }}>
    <SubfieldSpace />
    <SubfieldSpace size={2}>{props.children}</SubfieldSpace>
    <SubfieldSpace />
  </Subfield>
}

interface ParallaxContainerProps extends BaseProps {
  bgSrc?: string;

  isFirst?: boolean;
}

function ParallaxContainer(props: ParallaxContainerProps) {
  // 写js的原因是因为内容默认放到了上面，为了不影响后续的元素，所以最上面的元素需要写一个margintop，并且要根据传递的内容来确定大小

  const [state] = useReactive({
    firstMarginTop: 0
  });
  const contentContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!props.isFirst) return;
    if (!isDef(contentContainer.current)) return;
    state.firstMarginTop = contentContainer.current.getBoundingClientRect().height / 2;
  }, []);

  useEventListener(window, 'resize', useDebounceHook(() => {
    if (!props.isFirst) return;
    if (!isDef(contentContainer.current)) return;
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


export default function Home() {
  return <div className={styles.home}>
    <Prepose
      preSrc={homeImages.premisedPreviewUrl}
      src={homeImages.premisedUrl}
      // src='https://www.chali.com/assets/images/banner.7d377cc.jpg'
      headerClassName={styles.receptionHeader}
    >
      <GradualImg src={productionPreviewUrl} className={styles.productionPreview}></GradualImg>

      <SubfieldCloumn className={styles.blendedText} style={{ justifyContent: 'center' }}>
        <BlendedTextField><BlendedText className={styles.blendedTextMain} text='OUPRO' /></BlendedTextField>
        <BlendedTextField><BlendedText className={styles.blendedTextMain} text={CONFIG.PROJECT} /></BlendedTextField>
        <BlendedTextField><BlendedText className={styles.blendedTextMain} text='Building....' /></BlendedTextField>
      </SubfieldCloumn>
    </Prepose>

    <Caption
      title={
        <FlexRow style={{ gap: '20px' }}>
          <div>Welcome to {CONFIG.PROJECT}</div>
          <Logo size={30} className={styles.logoAnimation} />
        </FlexRow>
      }
    >
      个人学习生活记录
    </Caption>

    <ParallaxContainer isFirst bgSrc='http://www.fluttuo.com/wp-content/uploads/2013/11/Fluttuo_Made-Once-Only_Traugott-Collection_Cover_mini.jpg'>
      <h2>流程图构建</h2>
      <p>&nbsp;</p>
      <p>转变你使用数据和对数据进行可视化的方式，使你可以将最佳想法变为现实。</p>
      <p>&nbsp;</p>
      <p>{CONFIG.PROJECT} 拥有数十种现成的模板和数种可自定义的形状，使创建强大的视觉对象变得简单而有趣。</p>
    </ParallaxContainer>

    <ParallaxContainer bgSrc='https://www.fluttuo.com/wp-content/uploads/2013/11/Fluttuo_Made-Once-Only_Freely-Collection_Cover_Web_mini.jpg'>
      <p>&nbsp;</p>
      <h2>终极图表绘制工具</h2>

      <p>&nbsp;</p>
      <p>
        自信从容地创建易于理解的视觉对象。
      </p>
    </ParallaxContainer>

    <ParallaxContainer bgSrc='https://www.fluttuo.com/wp-content/uploads/2013/11/Fluttuo_Made-Once-Only_Nuance-Collection_Cover_mini.jpg'>
    <p>&nbsp;</p>
      <h2>自定义插件化</h2>

      <p>&nbsp;</p>
      <p>
        提供自主的本地插件化来增强你的应用程序
      </p>
    </ParallaxContainer>
  </div>
}





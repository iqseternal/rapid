import type { FC } from 'react';
import { useState, useEffect, useRef } from 'react';
import { SubfieldCloumn, Subfield, SubfieldSpace } from '@components/Subfield';
import { Parallax } from 'react-parallax';
import { homeImages } from '@/assets';
import { isDef } from '@suey/pkg-utils';
import { FlexRow } from '@/styled';
import { Space } from 'antd';
import { ScrollParallax } from 'react-just-parallax';
import type { CSSObject } from 'styled-components';
import { CONFIG } from '@rapid/config/constants';
import { ParallaxContainer } from './components/Parallax';

import styled from 'styled-components';
import styles from './index.module.scss';
import IconFont from '@components/IconFont';
import GradualImg from '@components/GradualImg';
import Perpose from '@/layout/ReceptionLayout/Prepose';
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

export default function Home() {
  return <div className={styles.home}>
    <Perpose
      src='https://www.chali.com/assets/images/banner.7d377cc.jpg'
      headerClassName={styles.receptionHeader}
    >
      <SubfieldCloumn className={styles.blendedText} style={{ justifyContent: 'center' }}>
        <BlendedTextField><BlendedText className={styles.blendedTextMain} text='OUPRO' /></BlendedTextField>
        <BlendedTextField><BlendedText className={styles.blendedTextMain} text={CONFIG.PROJECT} /></BlendedTextField>
        <BlendedTextField><BlendedText className={styles.blendedTextMain} text='Building....' /></BlendedTextField>
      </SubfieldCloumn>
    </Perpose>

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
      <p>

      </p>
    </ParallaxContainer>

    <ParallaxContainer bgSrc='https://www.fluttuo.com/wp-content/uploads/2013/11/Fluttuo_Made-Once-Only_Freely-Collection_Cover_Web_mini.jpg'>
      Section2
    </ParallaxContainer>

    <ParallaxContainer bgSrc='https://www.fluttuo.com/wp-content/uploads/2013/11/Fluttuo_Made-Once-Only_Nuance-Collection_Cover_mini.jpg' />
  </div>
}





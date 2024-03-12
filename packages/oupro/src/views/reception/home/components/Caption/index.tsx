
import { useState } from 'react';

import { FullSizeWidth, combinationStyled, FlexRowCenter, MaxViewWidth } from '@/styled';

import styles from './index.module.scss';

const CaptionContent = combinationStyled(FullSizeWidth, FlexRowCenter);

export interface CaptionProps extends BaseProps {
  title?: React.ReactElement;
}

export default function Caption(props: CaptionProps) {




  return <div className={styles.caption}>
    {props.title && <FlexRowCenter className={styles.title}>{props.title}</FlexRowCenter>}

    <CaptionContent className={styles.content}>{props.children}</CaptionContent>
  </div>;
}

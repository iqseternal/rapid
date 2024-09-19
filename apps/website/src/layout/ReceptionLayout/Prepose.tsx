import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ReceptionHasPerposeHeaderClassNameContext, ReceptionHasPreposeContext } from '@/context';
import { classnames } from '@libs/common';
import { CSSObject, CSSProperties } from 'styled-components';
import { MaxScreenWidth, MaxViewWidth, FullSizeWidth } from '@rapid/libs-web/styled';
import GradualImg from '@components/GradualImg';
import styles from './perpose.module.scss';

interface PreposeProps extends BaseProps {
  preSrc?: string;
  src: string;
  placeStyle?: CSSObject;
  headerClassName?: string;
}

export default function Prepose(props: PreposeProps) {
  const [_1, setPrepose] = useContext(ReceptionHasPreposeContext);
  const [_2, setHeaderClassName] = useContext(ReceptionHasPerposeHeaderClassNameContext);

  useLayoutEffect(() => {

    setPrepose(true);
    setHeaderClassName(props.headerClassName);

    return () => {
      setPrepose(false);
      setHeaderClassName(void 0);
    }
  }, []);

  return <FullSizeWidth className={classnames(styles.perpose, props.className)}>
    <GradualImg imgClassName={styles.perposeBg} preSrc={props.preSrc} src={props.src} style={{ ...props.style, height: 0 }} />

    <div className={styles.perposeSpace}>
      <div className={styles.perposePlaceholder} style={props.placeStyle} />
      {props.children}
    </div>
  </FullSizeWidth>;
}

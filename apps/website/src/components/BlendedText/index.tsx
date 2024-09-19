import { useRef, useEffect, useState } from 'react';
import { setCssVar, getCssVar } from '@libs/dom';
import { classnames } from '@libs/common';
import styles from './index.module.scss';

interface BlendedTextProps extends BaseProps {
  text?: string;
  distSpacing?: number;
}

export default function BlendedText(props: BlendedTextProps) {
  const blended = useRef<HTMLDivElement>(null);
  const [hasAnimation, setHasAnimation] = useState(false);

  useEffect(() => {
    if (!blended.current) return;

    setCssVar(blended.current, '--spacing', parseInt(getCssVar(blended.current, 'font-size')) * -1 + 'px');
    setCssVar(blended.current, '--dist-spacing', (props.distSpacing ?? 10) + 'px');
    setHasAnimation(true);
  }, []);

  return <div
    {...props}
    ref={blended}
    className={
      classnames(styles.blended, props.className, {
        [styles.hasAnimation]: hasAnimation
      })
    }
  >
    {props.children ? props.children : props.text}
  </div>
}

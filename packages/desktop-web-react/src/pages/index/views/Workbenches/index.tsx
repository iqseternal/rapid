import { FullSize, combinationStyled } from '@/styled';
import { combinationCName } from '@rapid/libs/common';
import { useShallowReactive, useReactive, useAutoState } from '@rapid/libs/hooks';
import { Collapse } from 'antd';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import animationStyles from '@scss/common/animation.module.scss';
import commonStyles from '@scss/common/index.module.scss';
import styles from './index.module.scss';

export default function Workbenches() {

  const [state] = useShallowReactive({
    name: 1
  })


  return <FullSize className={styles.workbenches}>

    <div>1</div>

    <div>1</div>
    <div>1</div>

  </FullSize>
}

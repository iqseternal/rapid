import { FullSize, combinationStyled } from '@/styled';
import { combinationCName } from '@rapid/libs/common';
import { useShallowReactive, useReactive, useAutoState } from '@rapid/libs/hooks';
import { Button, Collapse } from 'antd';
import { useNavigate } from 'react-router-dom';
import { loginRoute } from '@pages/index/router';
import { useFadeOut } from '@/hooks';

import animationStyles from '@scss/common/animation.module.scss';
import commonStyles from '@scss/common/index.module.scss';
import styles from './index.module.scss';

import axios from 'axios';

export default function Workbenches() {
  const navigate = useNavigate();

  const [state] = useShallowReactive({
    name: 1
  })



  return <FullSize className={styles.workbenches}>

    <div>1</div>

    <div>1</div>
    <div>1</div>


    <Button type='primary' onClick={() => useFadeOut(() => {
      navigate(loginRoute.meta.fullpath)
    })}></Button>
  </FullSize>
}

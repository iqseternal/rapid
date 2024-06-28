import { useAppSelector } from '@/features';
import { FullSize } from '@/styled';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useAsyncEffect, useFadeIn } from '@hooks/index';
import { useNavigate } from 'react-router-dom';
import { windowResizeAble, windowSetSize } from '@/actions';
import { rApiGet, rApiPost } from '@/api';

import Header from '@components/Header';

export default function Login() {
  const userStore = useAppSelector(store => store.user);

  useEffect(() => {
    console.log('userStore', userStore);
  });

  useAsyncEffect(async () => {
    const { data } = await rApiGet('/t', {
      data: { username: 'zms', password: '123' }
    })


    console.log(data);
  }, []);

  useFadeIn(async () => {

    await windowSetSize({ width: 800, height: 500 });

    await windowResizeAble({ able: false });
  });


  return <FullSize>
    <Header />

  </FullSize>
}

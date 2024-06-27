
import { FullSize } from '@/styled';
import { workbenchesRoute } from '@pages/index/router';
import { useLocation, useNavigate, useNavigation } from 'react-router-dom';
import { useFadeIn } from '@hooks/index';
import { windowEnableFullScreen, windowResizeAble, windowSetSize } from '@/actions';

import Header from '@components/Header';


export default function Login() {
  // const navigate = useNavigate();
  // const navigation = useNavigation();

  useFadeIn(async () => {

    await windowSetSize({ width: 800, height: 500 });

    await windowResizeAble({ able: false });
  });


  return <FullSize>
    <Header />


    1
  </FullSize>
}

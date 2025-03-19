
import { memo, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';

const RootLayout = memo(() => {
  const [styles, api] = useSpring(() => ({
    from: { opacity: 0 }, // 初始状态：完全透明
    config: { duration: 1000 }, // 固定时长配置（或弹簧参数）
  }));

  useEffect(() => {
    api.start({ opacity: 1 }); // 组件挂载时触发动画
  }, []);

  return (
    <animated.div
      className='w-full h-full'
      style={styles}
    >
      <Outlet />
    </animated.div>
  )
})

export default RootLayout;

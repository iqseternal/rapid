import { Suspense, useEffect } from 'react';
import type { ReactElement } from 'react';
import { Routes, HashRouter } from 'react-router-dom';
import { makeRoute, createRoutesChildren, reserveRoutes } from '@rapid/libs-web/router';

import * as presetRoutes from './modules';

export const { retrieveRoutes, useRetrieveRoute } = reserveRoutes(presetRoutes);

export default function RouterContext() {

  useEffect(() => {
    window.printer.printInfo('RouterContext 路由挂载渲染');
  }, []);

  return (
    <HashRouter>
      <Suspense
        fallback={<>
          <div>正在加载组件 ....</div>
          <div>当然, 你可能在出错的时候才有可能看到此页面....</div>
        </>}
      >
        <Routes>
          {createRoutesChildren([presetRoutes.rootRoute], {
            /**
             * 异步 lazy 组件展示
             * @returns {ReactElement}
             */
            onLazyComponent: ({ children }): ReactElement => {


              return <Suspense fallback={
                // <Skeleton />

                <></>
              }>
                {children}
              </Suspense>
            }
          })}
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

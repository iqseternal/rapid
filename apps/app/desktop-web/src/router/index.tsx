import { Suspense, useEffect, memo } from 'react';
import type { ReactElement } from 'react';
import { Routes, HashRouter } from 'react-router-dom';
import { makeRoute, createRoutesChildren, reserveRoutes } from '@rapid/libs-web/router';
import { Skeleton } from 'antd';

import * as presetRoutes from './modules';

export const { retrieveRoutes, useRetrieveRoute } = reserveRoutes(presetRoutes);

export const RouterContext = memo(() => {

  return (
    <HashRouter>
      <Suspense
        fallback={(
          <>
            <div>正在加载组件 ....</div>
            <div>当然, 你可能在出错的时候才有可能看到此页面....</div>
          </>
        )}
      >
        <Routes>
          {createRoutesChildren([presetRoutes.rootRoute], {
            /**
             * 异步 lazy 组件展示
             */
            onLazyComponent: ({ children }) => {
              return (
                <Suspense
                  fallback={(
                    <>
                      <Skeleton />
                    </>
                  )}
                >
                  {children}
                </Suspense>
              )
            }
          })}
        </Routes>
      </Suspense>
    </HashRouter>
  )
})

export default RouterContext;

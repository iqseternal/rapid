import type { ReactElement, ReactNode } from 'react';

import { heavyDutyGuard, type ReactComponent } from './declare';
import { useEffect, useContext, forwardRef, useLayoutEffect, memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRetrieveRoute } from '@/router';
import { useAuthHasAuthorized } from '@/features';

/**
 * 验证是否获得了授权
 */
const AuthAuthorizedFc = memo((props: { children: ReactNode; }) => {
  const { children } = props;

  const navigate = useNavigate();
  const hasAuthorized = useAuthHasAuthorized();
  const loginRoute = useRetrieveRoute(routes => routes.loginRoute);

  useLayoutEffect(() => {
    if (!hasAuthorized) navigate(loginRoute.meta.fullPath);
  }, [hasAuthorized]);

  if (!hasAuthorized) return <></>;
  return <>{children}</>;
});

function AuthAuthorizedFn<GFC extends ReactComponent>(Component: GFC): GFC {
  return memo(forwardRef((props, ref) => {
    const F = Component as ReactComponent;
    const children = <F ref={ref} />;

    return <AuthAuthorizedFc {...props} children={children} />
  })) as unknown as GFC;
}

/**
 * 验证是否获得了授权
 */
export const AuthAuthorized = heavyDutyGuard(AuthAuthorizedFn, AuthAuthorizedFc);

export default AuthAuthorized;

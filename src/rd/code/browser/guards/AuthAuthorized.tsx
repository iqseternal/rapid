import type { ReactElement, ReactNode } from 'react';

import { heavyDutyGuard, type ReactComponent } from './declare';
import { useEffect, useContext, forwardRef, useLayoutEffect, memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRetrieveRoute } from '@/router';
import { useAuthHasAuthorized } from '@/features';
import { isReactComponent } from '@rapid/libs-web';

export interface AuthAuthorizedComponentProps {

  children: ReactNode;
}

/**
 * 验证是否获得了授权
 */
export const AuthAuthorized = heavyDutyGuard(memo((props: AuthAuthorizedComponentProps): ReactElement => {
  const { children } = props;

  const navigate = useNavigate();
  const hasAuthorized = useAuthHasAuthorized();
  const ticketRoute = useRetrieveRoute(routes => routes.ticketRoute);

  useEffect(() => {
    if (!hasAuthorized) {
      navigate(ticketRoute.meta.fullPath);
    }
  }, [hasAuthorized]);

  if (!hasAuthorized) return <></>;

  return <>{children}</>;
}));

export default AuthAuthorized;

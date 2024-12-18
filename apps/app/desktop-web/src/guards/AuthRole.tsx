import type { ReactNode } from 'react';
import { forwardRef, isValidElement, memo } from 'react';
import { useAuthRole } from '@/features';
import { isObject } from '@rapid/libs';
import type { ReactComponent } from './declare';
import { heavyDutyGuard } from './declare';
import { isReactComponent } from '@rapid/libs-web';

export interface AuthRoleProps {
  role?: number;

  children: ReactNode;
}

/**
 * 验证用户的角色
 */
export const AuthRole = heavyDutyGuard(memo<AuthRoleProps>((props): ReactNode => {
  const { children } = props;
  
  const hasRoleState = useAuthRole({});

  if (!hasRoleState.hasRole) return <></>;
  return <>{children}</>;
}));

export default AuthRole;

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
 * 守卫函数组件
 */
const AuthRoleFc = memo<AuthRoleProps>((props): ReactNode => {
  const { children } = props;
  const hasRoleState = useAuthRole({});

  if (!hasRoleState.hasRole) return <></>;
  return <>{children}</>;
})

function AuthRoleFn<GFC extends ReactComponent>(Component: GFC): GFC {
  return memo(forwardRef<any, any>((props, ref) => {
    const F = Component as ReactComponent;
    const children = <F ref={ref} />;

    return <AuthRoleFc {...props} children={children} />;
  })) as unknown as GFC;
}

/**
 * 验证用户的角色
 */
export const AuthRole = heavyDutyGuard(AuthRoleFn, AuthRoleFc);

export default AuthRole;

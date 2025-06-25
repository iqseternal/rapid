

import type { CSSTransitionClassNames } from 'react-transition-group/CSSTransition';

import styles from './workbenchesRouteSwitch.module.scss';

export const workbenchesRouteSwitchTransitionClassNames: CSSTransitionClassNames = {
  appear: styles.workbenchesRouteSwitchAppear,
  appearActive: styles.workbenchesRouteSwitchAppearActive,
  appearDone: styles.workbenchesRouteSwitchAppearDone,
  enter: styles.workbenchesRouteSwitchEnter,
  enterActive: styles.workbenchesRouteSwitchEnterActive,
  enterDone: styles.workbenchesRouteSwitchEnterDone,
  exit: styles.workbenchesRouteSwitchExit,
  exitActive: styles.workbenchesRouteSwitchExitActive,
  exitDone: styles.workbenchesRouteSwitchExitDone
} as const;


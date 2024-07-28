import { CSSTransitionClassNames } from 'react-transition-group/CSSTransition';
import { DependencyList, useMemo } from 'react';
import animationStyles from './animation.module.scss';
import commonStyles from './index.module.scss';

export {
  animationStyles,
  commonStyles
}

export const makeTransitionAnimation = <ClassNames extends CSSTransitionClassNames>(classnames: ClassNames) => classnames;

const animationClassNames = {
  workbenchesRouteSwitch: makeTransitionAnimation({
    appear: animationStyles.workbenchesRouteSwitchAppear,
    appearActive: animationStyles.workbenchesRouteSwitchAppearActive,
    appearDone: animationStyles.workbenchesRouteSwitchAppearDone,
    enter: animationStyles.workbenchesRouteSwitchEnter,
    enterActive: animationStyles.workbenchesRouteSwitchEnterActive,
    enterDone: animationStyles.workbenchesRouteSwitchEnterDone,
    exit: animationStyles.workbenchesRouteSwitchExit,
    exitActive: animationStyles.workbenchesRouteSwitchExitActive,
    exitDone: animationStyles.workbenchesRouteSwitchExitDone
  })
} as const;

export type AnimationClassNamesType = typeof animationClassNames;
export type AnimationClassNameSelector = <
  AnimationClassName extends keyof AnimationClassNamesType
>(
  animations: AnimationClassNamesType
) => AnimationClassNamesType[AnimationClassName];

export const useAnimationClassSelector = (selector: AnimationClassNameSelector, deps: DependencyList) => {
  return useMemo(() => {
    return selector(animationClassNames);
  }, deps);
}

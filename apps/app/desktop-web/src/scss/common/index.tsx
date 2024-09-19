import type { CSSTransitionClassNames } from 'react-transition-group/CSSTransition';
import { useMemo } from 'react';

import animationStyles from './animation.module.scss';
import commonStyles from './index.module.scss';

export { animationStyles, commonStyles };

/**
 * 该函数没有实际作用, 用处为为编写 animationClassNames 项提供 TS 提示, 并且不会影响 animationClassNames 对象的原始定义类型描述
 */
export const makeTransitionAnimation = <ClassNames extends Required<CSSTransitionClassNames>>(classnames: ClassNames) => classnames;

const animationClassNames = {
  rootRouteSwitch: makeTransitionAnimation({
    appear: animationStyles.rootRouteSwitchAppear,
    appearActive: animationStyles.rootRouteSwitchAppearActive,
    appearDone: animationStyles.rootRouteSwitchAppearDone,
    enter: animationStyles.rootRouteSwitchEnter,
    enterActive: animationStyles.rootRouteSwitchEnterActive,
    enterDone: animationStyles.rootRouteSwitchEnterDone,
    exit: animationStyles.rootRouteSwitchExit,
    exitActive: animationStyles.rootRouteSwitchExitActive,
    exitDone: animationStyles.rootRouteSwitchExitDone
  }),
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
  }),
} as const;

/** 动画类名集合的类型 */
export type AnimationClassNamesType = typeof animationClassNames;

/** 动画类名的选择函数 */
export type AnimationClassNameSelector = <
  AnimationClassName extends keyof AnimationClassNamesType
>(
  animations: AnimationClassNamesType
) => AnimationClassNamesType[AnimationClassName];

/**
 * 该函数仅配合 `react-transition-group` 库使用, 用于为必要得动画组件提供类名集合
 *
 * @example
 * const switchAnimation = useAnimationClassSelector(animations => animations.workbenchesRouteSwitch);
 *
 * <CSSTransition
 *   key={location.pathname}
 *   nodeRef={nodeRef}
 *   timeout={300}
 *   classNames={switchAnimation}
 *   appear={true}
 *   unmountOnExit={false}
 * >
 *   <FullSize ref={nodeRef} />
 * </CSSTransition>
 */
export const useAnimationClassSelector = (selector: AnimationClassNameSelector) => {
  return useMemo(() => {
    return selector(animationClassNames);
  }, []);
}


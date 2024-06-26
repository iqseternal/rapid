/**
 * ==========================================
 * 项目 Hooks
 * ==========================================
 */

export { useCssVar, useCssVarForRoot } from './useCssVar';
export { useDebounce, useDebounceHook } from './useDebounce';
export { useThrottle, useThrottleHook } from './useThrottle';
export { useEventListener, useEventListenerForElement } from './useEventListener';

export type { MousetrapAction, MousetrapBindFn, MousetrapBinds } from './useMousetrap';
export { useMousetrap } from './useMousetrap';
export { useTimeout } from './useTimeout';

export type { ValidateRef, ValidateRefResult, Result } from './useValidate';
export { useValidate, useValidateRef } from './useValidate';

export type { ModalMode, ModalHookEmits, ModalEvt, ModalAllAttrs } from './useModal';
export { useModalAttrs, useModalProps, useModalEvts } from './useModal';

export { usePagination } from './usePaginationAttrs';

export type { InitTableFn } from './useTableAttrs';
export { useTableAttrs } from './useTableAttrs';

export type { FadeOptions, FadeCallback } from './useFade';
export { useFadeIn, useFadeOut } from './useFade';

export { useColumns } from './useColumns';

export type { AntdRuleObject, AntdRules, Rules, RuleObject, RuleArr, ValidatorFn } from './useRules';
export { useRules, is, not, and, or } from './useRules';

export { useResizeObserver } from './useResizeObserver';

export type { StorageStackOptions, JudgeIsCanControlStack } from './useStorageStack';
export { useStorageStack } from './useStorageStack';

export { useDisableRouterBack, useDisableRouterBackHook } from './useRouterJump';

export { useDisableDragText, useEnableDragText } from './useDisableDragText';

export { usePickColorsAttrs, usePickColorsAttrsHook, useScopedPickColorsAttrs, useScopedPickColorsAttrsHook } from './usePickColors';
export type { PickColorsProps } from './usePickColors';

export type { SurvivalCycleOptions } from './useSurvivalCycle';
export { useSurvivalCycle } from './useSurvivalCycle';

export { useNoEffect, useNoEffectHook } from './useNoEffect';

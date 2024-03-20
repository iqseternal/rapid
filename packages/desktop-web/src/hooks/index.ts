/**
 * ==========================================
 * 项目 Hooks
 * ==========================================
 */

export { useCssVar, useCssVarForRoot } from './useCssVar';
export { useDebounce, useDebounceHook } from './useDebounce';
export { useEventListener, useEventListenerForElement } from './useEventListener';

export type { MousetrapAction, MousetrapBindFn, MousetrapBinds } from './useMousetrap';
export { useMousetrap } from './useMousetrap';
export { useTimeout } from './useTimeout';

export type { ValidateRef, ValidateRefResult, Result } from './useValidate';
export { useValidate, useValidateRef } from './useValidate';

export type { ModalMode, ModalHookEmits, ModalEvt, ModalAllAttrs } from './useModal';
export { useModalAttrs, useModalProps, useModalEvt } from './useModal';

export { usePagination } from './usePaginationAttrs';

export type { InitTableFn } from './useTableAttrs';
export { useTableAttrs } from './useTableAttrs';

export type { FadeOptions, FadeCallback } from './useFade';
export { useFadeIn, useFadeOut } from './useFade';

export { useColumns } from './useColumns';

export type { AntdRuleObject, AntdRules, Rules, RuleObject, RuleArr, ValidatorFn } from './useRules';
export { useRules, is, not, and, or } from './useRules';

export { useErrorCaptured } from './useErrorCaptured';
export { useResizeObserver } from './useResizeObserver';

export type { StorageStackOptions, JudgeIsCanControlStack } from './useStorageStack';
export { useStorageStack } from './useStorageStack';

export { useDisableRouterBack, useDisableRouterBackHook } from './useRouterJump';

export { useDisableDragText } from './useDisableDragText';

import type { Ref } from 'vue';
import { ref, provide, inject } from 'vue';

const DEFINE_PROVIDE_KEY = Symbol('DEFINE_PROVIDE_KEY');

export const DEFINE_PROVIDE_PROP_KEYS = {
  R_CPT_LOGIN_STAGE: 'R_CPT_LOGIN_STAGE',
  R_CPT_REGISTER_STAGE: 'R_CPT_REGISTER_STAGE',
  R_CPT_REQUEST_STAGE: 'R_CPT_REQUEST_STAGE',
  R_CPT_FORGET_PASSWORD: 'R_CPT_FORGET_PASSWORD'
} as const;

export type PropKeys = keyof typeof DEFINE_PROVIDE_PROP_KEYS;

export type SetStageFn = (key: PropKeys) => void;

/**
 * 登录页状态管理 stage
 * @return {[Ref<PropKeys>, PropKeys]}
 */
export const useStage = (): [Ref<PropKeys>, Ref<PropKeys>] => {
  const preStage = ref(DEFINE_PROVIDE_PROP_KEYS.R_CPT_LOGIN_STAGE) as Ref<PropKeys>;

  const stage = ref(DEFINE_PROVIDE_PROP_KEYS.R_CPT_LOGIN_STAGE) as Ref<PropKeys>;

  provide(DEFINE_PROVIDE_KEY, [
    stage,
    (key: PropKeys) => {
      preStage.value = stage.value;
      stage.value = key;
    },
    preStage
  ]);

  return [stage, preStage];
};

export const useStageInject = (): [Ref<PropKeys>, SetStageFn, Ref<PropKeys>] => {
  return inject<[Ref<PropKeys>, SetStageFn, Ref<PropKeys>]>(DEFINE_PROVIDE_KEY)
    ?? ([
      ref(DEFINE_PROVIDE_PROP_KEYS.R_CPT_LOGIN_STAGE),
      () => {},
      ref(DEFINE_PROVIDE_PROP_KEYS.R_CPT_LOGIN_STAGE)
    ]);
};


import { onMounted, onBeforeUnmount, onActivated, onDeactivated, ref } from 'vue';

export interface SurvivalCycleOptions {
  allowMoreTimes?: boolean;

  /** 组件挂载或者活跃 */
  survival?: () => void | Promise<void>;
  /** 组件卸载或者失活 */
  extinction?: () => void | Promise<void>;
}

/**
 * 使用 Vue 生命周期组合
 * @param options
 */
export function useSurvivalCycle(options?: SurvivalCycleOptions) {
  const { allowMoreTimes = false, survival = () => {}, extinction = () => {} } = options?? {};

  const isExecuted = ref({
    enter: true,
    leave: true
  });

  const survivalCycle = async () => {
    if (!isExecuted.value.enter && !allowMoreTimes) return;

    isExecuted.value.enter = false;
    isExecuted.value.leave = true;
    survival();
  }
  const extinctionCycle = async () => {
    if (!isExecuted.value.leave && !allowMoreTimes) return;

    isExecuted.value.leave = false;
    isExecuted.value.enter = true;
    extinction();
  }

  onMounted(survivalCycle);
  onActivated(survivalCycle);

  onDeactivated(extinctionCycle);
  onBeforeUnmount(extinctionCycle);
}

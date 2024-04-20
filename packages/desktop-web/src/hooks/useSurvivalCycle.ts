
import { onMounted, onBeforeUnmount, onActivated, onDeactivated, ref } from 'vue';

export interface SurvivalCycleOptions {
  allowMoreTimes?: boolean;

  survival: () => void | Promise<void>;
  extinction: () => void | Promise<void>;
}

/**
 * 使用 Vue 生命周期组合
 * @param options
 */
export function useSurvivalCycle(options?: SurvivalCycleOptions) {
  const { allowMoreTimes = false, survival = () => {}, extinction = () => {} } = options?? {};

  const isExecuted = ref(false);

  const survivalCycle = async () => {
    if (!allowMoreTimes && isExecuted.value) return;

    isExecuted.value = true;
    survival();
  }
  const extinctionCycle = async () => {
    if (!allowMoreTimes && !isExecuted.value) return;

    isExecuted.value = false;
    extinction();
  }



  onMounted(survivalCycle);
  onActivated(extinctionCycle);

  onDeactivated(survivalCycle);
  onBeforeUnmount(extinctionCycle);
}

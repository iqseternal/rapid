
import { onBeforeMount, ref } from 'vue';

export const useTimeout = () => {
  const timer = ref<NodeJS.Timeout | undefined>(void 0);

  const cancelTimeout = () => {
    if (timer.value) {
      clearTimeout(timer.value);
      timer.value = void 0;
    }
  }

  const perTimeout = (callback: (args: void) => void, ms?: number) => {
    cancelTimeout();
    timer.value = setTimeout(callback, ms);
  };

  onBeforeMount(() => {
    cancelTimeout();
  });

  return { perTimeout, timer, cancelTimeout };
};

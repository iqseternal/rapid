
import { isPromise } from '@suey/pkg-utils';
import { reactive } from 'vue';

const globalStatusState = reactive({
  isLoading: true,
})

const widthLoadingLife = <
  Fn extends (...args: unknown[]) => (any | Promise<any>)
>(fn: Fn): Fn extends ((...args: unknown[]) => Promise<any>) ? Fn : ((...args: unknown[]) => any) => {
  return ((...args: Parameters<Fn>) => {

    globalStatusState.isLoading = true;

    const _promise = fn(...args);

    if (isPromise(_promise)) {
      return new Promise(async (resolve, reject) => {

        _promise.then(resolve).catch(reject).finally(() => {


          globalStatusState.isLoading = false;
        });
      })
    }

    globalStatusState.isLoading = false;

    return _promise;
  }) as any
}


export const useGlobalStatusState = () => {



  return {
    globalStatusState, widthLoadingLife
  }

}


export const useGlobalStatusStateHook = useGlobalStatusState;

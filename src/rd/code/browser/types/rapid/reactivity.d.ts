
declare global {
  export namespace Rapid.Reactivity {
    export type Reactive<T> = import('@vue/reactivity').Reactive<T>;
    export type WatchSource<T> = import('@vue/reactivity').WatchSource<T>;
    export type WatchHandle = import('@vue/reactivity').WatchHandle;
    export type EffectScope = import('@vue/reactivity').EffectScope;
    export type OnCleanup = import('@vue/reactivity').OnCleanup;
    export type ReactiveEffect = import('@vue/reactivity').ReactiveEffect;
    export type ReactiveEffectOptions = import('@vue/reactivity').ReactiveEffectOptions;
    export type ReactiveEffectRunner = import('@vue/reactivity').ReactiveEffectRunner;
    export type Ref = import('@vue/reactivity').Ref;
    export type ShallowRef = import('@vue/reactivity').ShallowRef;
    export type UnwrapNestedRefs<T> = import('@vue/reactivity').UnwrapNestedRefs<T>;
    export type UnwrapRef<T> = import('@vue/reactivity').UnwrapRef<T>;
    export type UnwrapRefSimple<T> = import('@vue/reactivity').UnwrapRefSimple<T>;
    export type ComputedRef = import('@vue/reactivity').ComputedRef;
    export type WritableComputedRef<T, S> = import('@vue/reactivity').WritableComputedRef<T, S>;
    export type ReactiveMarker = import('@vue/reactivity').ReactiveMarker;
    export type DeepReadonly<T> = import('@vue/reactivity').DeepReadonly<T>;
  }
}

export {};

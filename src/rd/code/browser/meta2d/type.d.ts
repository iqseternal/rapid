

export type Write<T, U> = Omit<T, keyof U> & U;

export type WithImmer<S> = Write<S, StoreImmer<S>>;

export type StoreImmer<S> = S extends {
  getState: () => infer T;
  setState: infer SetState;
} ? SetState extends (...a: infer A) => infer Sr ? {
  setState(nextStateOrUpdater: T | Partial<T> | ((state: Draft<T>) => void), shouldReplace?: boolean | undefined, ...a: SkipTwo<A>): Sr;
} : never : never;

export type SkipTwo<T> = T extends {
  length: 0;
} ? [] : T extends {
  length: 1;
} ? [] : T extends {
  length: 0 | 1;
} ? [] : T extends [unknown, unknown, ...infer A] ? A : T extends [unknown, unknown?, ...infer A] ? A : T extends [unknown?, unknown?, ...infer A] ? A : never;

export type StorePersist<S, Ps> = {
  persist: {
    setOptions: (options: Partial<PersistOptions<S, Ps>>) => void;
    clearStorage: () => void;
    rehydrate: () => Promise<void> | void;
    hasHydrated: () => boolean;
    onHydrate: (fn: PersistListener<S>) => () => void;
    onFinishHydration: (fn: PersistListener<S>) => () => void;
    getOptions: () => Partial<PersistOptions<S, Ps>>;
  };
};

export type PersistListener<S> = (state: S) => void;

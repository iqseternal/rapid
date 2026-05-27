import type { UseBoundStore, Mutate, StoreApi, StoreMutatorIdentifier } from 'zustand';
import { useNormalState } from '@rapid/libs-web';
import { useRef } from 'react';

export type UseStoreReturnValue<T> = { value: T };

export type ZustandStore<TStore> = UseBoundStore<Mutate<StoreApi<TStore>, [StoreMutatorIdentifier, unknown][]>>;

export interface UseStoreType<TStore> {
	<T>(selector: (store: TStore) => T): [Readonly<UseStoreReturnValue<T>>];

	getState: () => TStore;

	/**
	 * 初始化数据, 数据的来源可能是异步的
	 */
	init: () => Promise<void>;
}


/**
 * 创建一个内部选择器
 * @param zStore
 * @param selector
 */
export function useZustandSelector<T, TStore, ZStore extends ZustandStore<TStore>>(zStore: ZStore, selector: (store: TStore) => T): [Readonly<UseStoreReturnValue<T>>] {
	const value = zStore(selector);

	const ef = useRef<UseStoreReturnValue<T>>({
		value: value
	})

	if (ef.current.value !== value) ef.current.value = value;
	return [ef.current] as const;
}

export const innerSelector = {

	useZustandSelector
} as const;

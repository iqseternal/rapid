import { useRefresh } from '@rapid/libs-web/hooks';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { unstable_batchedUpdates } from 'react-dom';

export interface Getter<Store, TResult extends any = any> {
  (store: Store): TResult;
}
export interface GetterInfo<Store> {
  getter: Getter<Store>;
}

export type Callback = () => void;

const runtimeContext: Record<string, any> = {  };

// 订阅者列表
const listeners = new WeakMap<GetterInfo<any>, Set<Callback>>();
const getterInfos = new Set<GetterInfo<any>>();

const updateTaskQueue: Callback[] = [];
const state = {
  // 标记是否在批处理中
  isBatchingTask: false
}

// 处理回调函数
const execCallback = () => {
  for (const getterInfo of getterInfos) {
    const callbacks = listeners.get(getterInfo);
    if (callbacks) callbacks.forEach(callback => callback());
  }
}

// 添加一个任务
const appendTask = (task: Callback) => updateTaskQueue.push(task);

// 调度批处理任务
const scheduleTask = () => {
  if (state.isBatchingTask) return;
  state.isBatchingTask = true;

  appendTask(execCallback);

  requestAnimationFrame(() => {
    unstable_batchedUpdates(() => {
      while (updateTaskQueue.length > 0) {
        const task = updateTaskQueue.shift()!;
        task();
      }
      state.isBatchingTask = false;
    });
  });
}

// 订阅函数
const subscribe = (getterInfo: GetterInfo<any>, callback: Callback) => {
  if (!listeners.has(getterInfo)) {
    listeners.set(getterInfo, new Set());
    getterInfos.add(getterInfo);
  }

  listeners.get(getterInfo)!.add(callback);

  return () => {
    const set = listeners.get(getterInfo)!;

    set.delete(callback);

    if (set.size === 0) {
      listeners.delete(getterInfo);
      getterInfos.delete(getterInfo);
    }
  };
};


// =====================================================
// create

export const createStore = <Store,>(store: Store) => {
  for (const key in store) runtimeContext[key] = store[key];
  return runtimeContext as Store;
}

export const createSlice = <Slice,>(slice: Slice) => {
  return slice;
}


// =====================================================
// update

export type UpdateStoreCallback<Store extends any = any,> = (store: Store) => void;
export interface UpdateStore<Store,> {
  (updateFn: UpdateStoreCallback<Store>): void;
}
// 更新
export const updateStore: UpdateStore<any> = (updateFn: UpdateStoreCallback) => {
  updateFn(runtimeContext);
  scheduleTask();
}

// =====================================================
// selector

export interface Selector<Store> {
  <TResult>(getter: Getter<Store, TResult>): TResult;
}

export const useSelector: Selector<any> = <Store,>(getter: Getter<Store>) => {
  const refresh = useRefresh();
  const getterInfoRef = useRef<GetterInfo<Store>>({ getter });

  useEffect(() => {
    const unsubscribe = subscribe(getterInfoRef.current, refresh);
    return () => unsubscribe();
  }, []);

  return getter(runtimeContext as Store);
}

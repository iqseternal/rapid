
import type { Context, ContextType, Dispatch, SetStateAction, Ref } from 'react';
import { createContext, useState } from 'react';

export type State<S> = [S, Dispatch<SetStateAction<S>>];

export const HelloWorldContext = createContext<State<string>>(['helloWorld', () => {}]);

// reception 页面中的滚动容器
export const ReceptionScrollContainerContext = createContext<Ref<null | HTMLDivElement>>(null);

// reception 页面是否含有前置块元素
export const ReceptionHasPreposeContext = createContext<State<boolean>>([false, () => {}]);
// reception 页面含有前置块元素时, 子组件为 header 提供类名变换样式
export const ReceptionHasPerposeHeaderClassNameContext = createContext<State<string | undefined>>([void 0, () => {}]);

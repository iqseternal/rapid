import type { RefObject } from 'react';

import Mousetrap from 'mousetrap';

export namespace KeyboardSampleKeys {
  export type All = '*';

  export type Control = 'alt' | 'meta' | 'shift' | 'option' | 'mod';

  export type Special = 'backspace' | 'tab' | 'enter' | 'return' | 'capslock' | 'esc' | 'escape' | 'space' | 'pageup' | 'pagedown' | 'end' | 'home' | 'left' | 'right' | 'up' | 'down' | 'ins' | 'del' | 'plus';

  export type Alphabet = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z';

  export type Number = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

  export type FunctionKeys = 'F1' | 'F2' | 'F3' | 'F4' | 'F5' | 'F6' | 'F7' | 'F8' | 'F9' | 'F10' | 'F11' | 'F12';
}

export type WithControl<K extends string> =
  | `${KeyboardSampleKeys.Control}+${K}`
  | `mod+${Exclude<KeyboardSampleKeys.Control, 'mod'>}+${K}`
  | `mod+alt+${K}`
  | `mod+option+${K}`
  | `mod+shift+${K}`
  | `alt+shift+${K}`
  | `option+shift+${K}`
  | `mod+alt+shift+${K}`
  | `mod+option+shift+${K}`
;

// 限制深度的组合键递归
export type KeyboardSampleCompose =
  | KeyboardSampleKeys.All
  | KeyboardSampleKeys.Alphabet
  | KeyboardSampleKeys.Control
  | KeyboardSampleKeys.Special
  | KeyboardSampleKeys.Number
  | KeyboardSampleKeys.FunctionKeys

  | WithControl<
    | KeyboardSampleKeys.Alphabet
    | KeyboardSampleKeys.Special
    | KeyboardSampleKeys.Number
    | KeyboardSampleKeys.FunctionKeys
  >
;


type Join<T extends readonly string[], D extends string = " "> =
  T extends readonly [infer F extends string, ...infer R extends readonly string[]]
    ? `${F}${R['length'] extends 0 ? '' : `${D}${Join<R, D>}`}`
    : ""
;



export function makeFlowKeys<FlowKeys extends readonly KeyboardSampleCompose[]>(...keys: FlowKeys): Join<FlowKeys> {
  return keys.join(' ') as Join<FlowKeys>;
}


export function useMousetrap(keys: readonly KeyboardSampleCompose[], callback: () => void): void;

export function useMousetrap(keys: readonly [KeyboardSampleCompose[], (() => void)][]): void;

export function useMousetrap<FlowKeys extends readonly KeyboardSampleCompose[]>(keys: FlowKeys, callback: () => void): void

export function useMousetrap<TDom extends HTMLElement>(target: TDom, key: readonly KeyboardSampleCompose[], callback: () => void): void;

export function useMousetrap<TDom extends HTMLElement>(target: RefObject<TDom>, keys: readonly KeyboardSampleCompose[], callback: () => void): void;


export function useMousetrap() {

}


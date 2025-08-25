import type { RefObject } from 'react';
import { useEffect } from 'react';

import Mousetrap from 'mousetrap';

export namespace KeyboardSampleKeys {
  export type All = '*';

  export type Control = 'alt' | 'meta' | 'shift' | 'option' | 'mod';

  export type Special = 'backspace' | 'tab' | 'enter' | 'return' | 'capslock' | 'esc' | 'escape' | 'space' | 'pageup' | 'pagedown' | 'end' | 'home' | 'left' | 'right' | 'up' | 'down' | 'ins' | 'del' | 'plus';

  export type Alphabet = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z';

  export type Number = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

  export type FunctionKeys = 'f1' | 'f2' | 'f3' | 'f4' | 'f5' | 'f6' | 'f7' | 'f8' | 'f9' | 'f10' | 'f11' | 'f12';
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

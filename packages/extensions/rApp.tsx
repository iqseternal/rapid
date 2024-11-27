import type { ComponentType } from 'react';
import { useSyncExternalStore, useCallback } from 'react';
import { DoubleLinkedList } from '@rapid/libs';
import { useRefresh } from '@rapid/libs-web/hooks';

import type { SlotPointKey, SlotPointSubscribe } from './SlotPoint';
import { SlotPoint } from './SlotPoint';

export const rApp = {
  extension: {
    slotPoint: new SlotPoint(),

    registerSlotPoint<Prop>(point: string, fc: ComponentType<Prop> | ComponentType<Prop>[]) {
      return rApp.extension.slotPoint.registerSlotPoint(point, fc);
    },

    useSlotPoint<Prop>(point: string): ComponentType<Prop> | ComponentType<Prop>[] {
      return rApp.extension.slotPoint.useSlotPoint(point)!;
    }
  },

  Commands: {
    Ctrl: ['ctrl'],
    CtrlLeft: [],
    CtrlRight: [],
    Command: [],
    Mod: ['mod'],
    Option: [],
    Alt: ['alt'],
    AltLeft: [],
    AltRight: [],
    Shift: [],
    ShiftLeft: [],
    ShiftRight: [],
    Esc: [],
    Enter: [],
    Space: [],
    PageUp: [],
    PageDown: [],
    Home: [],
    End: [],
    Tab: [],
    Backspace: [],
    Delete: [],
    Insert: [],
    ArrowUp: [],
    ArrowDown: [],
    ArrowLeft: [],
    ArrowRight: [],
    PrintScreen: [],
    F1: [],
    F2: [],
    F3: [],
    F4: [],
    F5: [],
    F6: [],
    F7: [],
    F8: [],
    F9: [],
    F10: [],
    F11: [],
    F12: [],
    Num0: [],
    Num1: [],
    Num2: [],
    Num3: [],
    Num4: [],
    Num5: [],
    Num6: [],
    Num7: [],
    Num8: [],
    Num9: [],
    Numpad0: [],
    Numpad1: [],
    Numpad2: [],
    Numpad3: [],
    Numpad4: [],
    Numpad5: [],
    Numpad6: [],
    Numpad7: [],
    Numpad8: [],
    Numpad9: [],
    NumpadAdd: [],
    NumpadSubtract: [],
    NumpadMultiply: [],
    NumpadDivide: [],
    NumpadDecimal: [],
    NumpadEnter: [],

    NumLock: [],
    ScrollLock: [],
    Pause: [],
    CapsLock: [],

    Windows: [],
    A: ['a'],
    B: ['b'],
    C: ['c'],
    D: ['d'],
    E: ['e'],
    F: ['f'],
    G: ['g'],
    H: ['h'],
    I: ['i'],
    J: ['j'],
    K: ['k'],
    L: ['l'],
    M: ['m'],
    N: ['n'],
    O: ['o'],
    P: ['p'],
    Q: ['q'],
    R: ['r'],
    S: ['s'],
    T: ['t'],
    U: ['u'],
    V: ['v'],
    W: ['w'],
    X: ['x'],
    Y: ['y'],
    Z: ['z']
  },

} as const;
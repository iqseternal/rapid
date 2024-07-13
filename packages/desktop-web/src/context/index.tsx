
import type { Context, ContextType, Dispatch, SetStateAction, Ref } from 'react';
import { createContext, useState } from 'react';

export type State<S> = [S, Dispatch<SetStateAction<S>>];


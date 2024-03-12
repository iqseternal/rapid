import { isDef, isUnDef } from '@suey/pkg-utils';
import { after } from 'node:test';

export const isNotSpaceStr = (...strs: (string | undefined | null)[]) => {
  if (strs.some(str => isUnDef(str))) return false;

  return (strs as string[]).every(str => str.trim() !== '');
};

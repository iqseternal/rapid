import { CONFIG } from '@rapid/config/constants';

export function mRapidC<
  VarName extends `--${Lowercase<typeof CONFIG['PROJECT']>}-${string}`,
  // Value extends string,
  Label extends string
>(varName: VarName, value: string, label: Label) {
  return {
    varName,
    value,
    label
  };
}


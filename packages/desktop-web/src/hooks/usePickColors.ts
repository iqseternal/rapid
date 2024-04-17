
import type { default as PickColors } from 'vue-pick-colors';

export type PickColorsProps = Partial<Required<typeof PickColors>['__defaults']>;


export function usePickColorsAttrs() {

  const pickColorsAttrs: PickColorsProps = {

    // size: 30,
    showAlpha: true,

    format: 'hex'


  }



  return { pickColorsAttrs }
}



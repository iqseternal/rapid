

export type EmitterEffectsKey = string | number | symbol;

export type EmitterEffectsValue = ((...args: unknown[]) => any)[];

export class EmitterEffectsManager<Entries extends Record<EmitterEffectsKey, EmitterEffectsValue>> {




  public combine() {



  }

  public eliminate() {


  }
}


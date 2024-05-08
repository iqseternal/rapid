
export type EvtCallback = (next: () => void | Promise<void>) => void | Promise<void>;

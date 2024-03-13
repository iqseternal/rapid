
// export type BaseCb = () => void;

export type EvtCallback = (next: BaseCb) => void | Promise<void>;

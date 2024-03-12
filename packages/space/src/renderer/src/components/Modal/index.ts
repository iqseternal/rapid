

import Modal from './index.vue';

export type ModalEmits = Record<
  (typeof Modal)['emits'] extends string[]
    ? (typeof Modal)['emits'][number]
    : 'ok' | 'cancel'
  ,
  () => void
>;

export * from './declare';


export { Modal };

export default Modal;

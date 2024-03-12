
import type { UnwrapNestedRefs, Ref, ComponentPublicInstance } from 'vue';
import { reactive, ref, toRefs, computed, getCurrentInstance, watch, ToRefs, toValue } from 'vue';
import type { ModalEmits, ModalProps } from '@components/Modal';

const defaultModalProps = {
  visible: false,
  title: '',
  okText: '确定',
  cancelText: '取消',
  height: 'max-content',
};

export type ModalMode = 'view' | 'create' | 'edit' | `other-${string}`;

// 不管你的回调如何执行, 只要是 false, 就会取消原本的关闭或者打开操作
export type ModalHookEmits<T> = Record<
  keyof ModalEmits,
  ((state: T, ...args: any[]) => boolean | void | Promise<boolean> | Promise<void>)
>;

export function useModalAttrs<
  R extends any = any,
  T extends ModalProps = ModalProps
>(modalProps: Partial<T> = {}, modalEmits: Partial<ModalHookEmits<UnwrapNestedRefs<T & typeof defaultModalProps>>> = {}) {

  // modal 需要的参数
  const modalAttrs = reactive<T & typeof defaultModalProps>({ ...defaultModalProps, ...(modalProps as Required<T>) });
  // modal 的状态, 例如 create 新建状态
  const modalMode = ref<ModalMode>('create');
  // modal 传递的参数, 可能内部需要某些数据进行初始化
  const sourceData = ref({}) as Ref<Partial<R>>;

  /**
   * cmp.vue:
   *  <div @click="() => emits('ok', true)"></div>
   *
   *  const emits = defineEmits({ (evt: 'ok', status: boolean): void; })
   *
   * <Cmp :onOk="ok"></Cmp>
   * <Cmp @ok="ok"></Cmp>
   *
   * 此时, 这个 ok 函数携带的参数会交给 ModalEmits 处理
   *
   * @param args
   * @return
   */
  const ok = async (...args: unknown[]) => {
    modalAttrs.visible = false;
    if (modalEmits?.ok) modalEmits.ok(modalAttrs, ...args);
  }

  const cancel = async (...args: unknown[]) => {
    modalAttrs.visible = false;
    if (modalEmits?.cancel) modalEmits.cancel(modalAttrs, ...args);
  }

  return {
    modalAttrs, // modal 的基本传值
    sourceData, // 表格新建类 modal 弹窗有时候需要传递一些字段值以供初始化
    modalMode, // modal 的模式
    ok, // modal 点击确认后的回调函数, 如果返回值为 false 或者 Promise<false> 那么可以中断 modal 的关闭
    cancel, // 同 ok
    open: (title: string, mode: ModalMode, sourceDataInit: Partial<R>) => {
      if (title) modalAttrs.title = title;
      if (mode) modalMode.value = mode;
      if (sourceDataInit) sourceData.value = { ...sourceDataInit };
      modalAttrs.visible = true;
    },
    close: () => {
      modalAttrs.visible = false;
    },
    /**
     * 所有参数, 可以自动绑定事件
     */
    modalAllAttrs: computed(() => ({
      ...modalAttrs,
      sourceData: sourceData.value,
      mode: modalMode.value,
      onOk: ok,
      onCancel: cancel
    }))
  }

}

// modal 的所有 Attrs
export type ModalAllAttrs<R> = ReturnType<typeof useModalAttrs<R>>['modalAllAttrs'];

export interface ModalEvt<SourceDataType> {
  reset: (modeAttrs: ModalAllAttrs<SourceDataType>['value']) => void;
  init: (modeAttrs: ModalAllAttrs<SourceDataType>['value']) => void;
}

/**
 * 使用事件, 一般使用这个进行 Modal 数据初始化
 * @param evts
 * @returns
 */
export function useModalEvt<R>(evts: Partial<ModalEvt<Partial<R>>>) {
  const instance = getCurrentInstance();

  if (!instance) return;

  const attrs = computed(() => ({
    ...(instance.props),
    ...((instance as any).setupContext.attrs ?? {})
  })) as ModalAllAttrs<R>;

  watch(() => attrs.value.visible, nv => {
    if (nv) evts.init && evts.init(attrs.value);
    else evts.reset && evts.reset(attrs.value);
  })
}

/**
 * 访问 Modal 的传递的 Props，准确来说是 Attrs
 * @returns
 */
export function useModalProps<R>(): ModalAllAttrs<R> {
  const instance = getCurrentInstance();

  const attrs = computed(() => ({
    ...(instance?.props ?? {}),
    ...((instance as any).setupContext.attrs ?? {})
  })) as ModalAllAttrs<R>;

  return attrs;
}

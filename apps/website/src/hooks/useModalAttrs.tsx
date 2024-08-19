
import type { TableProps as ATableProps, TablePaginationConfig as ATablePaginationConfig, ModalProps as AModalProps } from 'antd';
import { useState, useEffect } from 'react';


export enum MODAL_MODE {
  CREATE = 'create',
  EDIT = 'edit',
  VIEW = 'view'
}



export interface ModalEvents {
  create?: () => void;

  edit?: () => void;

  view?: () => void;
}

export interface ModalAttrs<DataSource extends Record<string, unknown> = Record<string, any>> extends AModalProps {
  handlerOk?: () => void;
  handlerCancel?: () => void;

  dataSource?: DataSource;
  mode?: MODAL_MODE;
}

export function useModalEvents(events: ModalEvents, props: ModalAttrs) {
  useEffect(() => {
    if (props.mode === MODAL_MODE.CREATE) {

      events.create && events.create();
    }
    else if (props.mode === MODAL_MODE.EDIT) {
      events.edit && events.edit();
    }
  }, [props.open]);
}


/**
 * Modal 模态弹窗的 attrs
 */
export function useModalAttrs<RecordType extends Record<string, unknown>, Props extends ModalAttrs>(props: Props = ({} as Props), callbacks: {
  ok: () => void;
  cancel: () => void;
} = ({} as any)) {
  const [modalProps, setModalProps] = useState<ModalAttrs>({
    visible: false,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      callbacks.ok && callbacks.ok();
      setModalProps(attrs => ({ ...attrs, visible: false }))
    },
    onCancel: () => {
      callbacks.cancel && callbacks.cancel();
      setModalProps(attrs => ({ ...attrs, visible: false }))
    },
    mode: MODAL_MODE.CREATE,
    dataSource: {},
    ...props
  });

  useEffect(() => {
    setModalProps(attrs => ({
      ...attrs,
      onOk: () => {
        callbacks.ok && callbacks.ok();
      setModalProps(attrs => ({ ...attrs, visible: false }))
      },
      onCancel: () => {
        callbacks.cancel && callbacks.cancel();
        setModalProps(attrs => ({ ...attrs, visible: false }))
      },
    }))
  }, [callbacks.ok, callbacks.cancel]);

  /** 打开新建模态弹窗 */
  function open(mode: MODAL_MODE.CREATE, title: string, dataSource?: RecordType): void;
  /** 打开编辑模态弹窗 */
  function open(mode: MODAL_MODE.EDIT, title: string, dataSource: RecordType): void;
  /** 打开查看模态弹窗 */
  function open(mode: MODAL_MODE.VIEW, title: string, dataSource: RecordType): void;
  function open(mode: MODAL_MODE, title: string, dataSource: RecordType = ({} as RecordType)) {
    setModalProps(attrs => ({ ...attrs, visible: true, mode, title, dataSource }));
  }

  /** 关闭模态弹窗 */
  const close = () => setModalProps(attrs => ({ ...attrs, visible: false }));

  return { modalProps, setModalProps, open, close }
}


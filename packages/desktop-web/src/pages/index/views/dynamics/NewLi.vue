<template>
  <Modal v-bind="$attrs" :handleOk="handleOk">
    <AForm
      ref="formRef"
      :model="form"
      :rules="rules"
    >
      <AFormItem name="name" label="名称" required>
        <AInput v-model:value="form.name" />
      </AFormItem>
    </AForm>
  </Modal>
</template>

<script lang="ts" setup>
import { reactive, watch, ref } from 'vue';
import type { FormInstance, FormProps } from 'ant-design-vue';
import type { Response } from './api';
import { useModalEvt, useRules, useModalProps, not, or, and, is } from '@/hooks';
import { message } from 'ant-design-vue';
import { validateChinaPhone, validateEmail, validateIsSpaceStr, validateRealName, validateValidStr } from '@rapid/validates';
import { isString } from '@suey/pkg-utils';

import Modal from '@components/Modal';

const form = ref<Response>({
  name: '',
  age: '',
  data: {
    s_addr: '',
    d_addr: ''
  }
});
const formRef = ref<FormInstance>();

const rules = useRules<Response>({ // 定义表单校验
  name: {
    required: true,
    validator: [
      validateValidStr, '请输入姓名',
      validateRealName, '请输入正确的姓名'
    ]
  }
})

const handleOk: ModalEvtCallBack = (next) => { // 点击了确认按钮，调用 next 函数进行下一步
  formRef.value?.validate().then(() => {

    next();
  }).catch(() => {

    message.error('请完成表单填写');
  })
}

useModalEvt<Response>({ // Modal 框的事件处理，例如初始化事件和重置事件
  init: ({ sourceData, mode }) => {


  },
  reset: ({ sourceData, mode }) => {

  }
})
</script>

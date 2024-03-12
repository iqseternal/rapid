<template>
  <Form :model="form">
    <RFormItem name="username" hasFeedback :validateStatus="userVaStatus" :rules="{ validator: userVaFn }">
      <RInput v-model:value="form.username" placeholder="请输入用户名/邮箱" :maxlength="16">
        <template #prefix><MailOutlined style="color: rgba(0, 0, 144, 0.25)" /></template>
        <template #topic>User/Email</template>
      </RInput>
    </RFormItem>
    <RFormItem name="password" hasFeedback :validateStatus="pwdVaStatus" :rules="{ validator: pwdVaFn }">
      <RInput ref="lastInput" v-model:value="form.password" type="password" placeholder="请输入用户密码" :maxlength="16" @pressEnter="() => emits('finish')">
        <template #prefix><LockOutlined style="color: rgba(0, 0, 144, 0.25)" /></template>
        <template #topic>Password</template>
      </RInput>
    </RFormItem>
  </Form>
</template>

<script lang="ts" setup>
import type { LoginFormRef, AntdVFormRef } from './declare.d';
import type { Ref } from 'vue';
import { ref, onMounted, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import type { FormInstance } from 'ant-design-vue';
import { Space, FormItem, Modal, Form, Input, InputPassword, notification, message, Checkbox, Radio } from 'ant-design-vue';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons-vue';
import { useMousetrap } from '@renderer/hooks/useMousetrap';
import { useValidate, useValidateRef } from '@renderer/hooks';

import Subfield from '@components/Subfield';
import RInput from '@components/RInput';
import RButton from '@components/RButton';
import RFormItem from '@components/RFormItem';

const props = defineProps({
  autoFill: { type: Boolean, default: () => false }
});

const emits = defineEmits(['finish']);

const form = reactive<LoginFormRef['form']>({ username: 'admin', password: '12345678' });
const lastInput = ref() as Ref<LoginFormRef['lastInput']>;

const { validateMessage: userVaMessage, validateStatus: userVaStatus, validateFn: userVaFn } = useValidate((value: string) => {
  if (value === '') return { message: '请输入用户账号', status: '' };
  if (/ /.test(value)) return { message: '用户账号不能含有空格', status: 'error' };
  if (value.length < 5) return { message: '用户名太短, 最少五位长度', status: 'error' };
  if (value.length > 16) return { message: '用户名最大长度16位', status: 'error' };
  if (/^[a-zA-Z0-9]{5,16}$/.test(value)) return { message: '', status: 'success' };
  return { message: '验证失败', status: 'error' };
});
const { validateMessage: pwdVaMessage, validateStatus: pwdVaStatus, validateFn: pwdVaFn } = useValidate((value: string) => {
  if (value === '') {
    if (form.username !== '')  return { message: '请输入用户密码', status: 'error' };
    return { message: '', status: '' }
  }
  if (/ /.test(value)) return { message: '用户密码不能含有空格', status: 'error' };
  if (value.length < 6) return { message: '用户密码最少6位', status: 'error' };
  if (value.length > 16) return { message: '用户密码最大16位', status: 'error' };

  if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,16}$/) {
    // if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9~!@#$%^&*]{8,16}$/.test(value)) return { message: '', status: 'success' };
    // return { message: '弱密码', status: 'warning' };
    return { message: '', status: 'success' };
  }
  return { message: '密码只能包含字母或者数字的组合', status: 'error' };
});

defineExpose<LoginFormRef>({
  form,
  lastInput: lastInput as unknown as LoginFormRef['lastInput'],
  validate: useValidateRef(form, {
    username: [userVaFn, userVaMessage],
    password: [pwdVaFn, pwdVaMessage]
  })
});
</script>

<style lang="scss" scoped>

</style>

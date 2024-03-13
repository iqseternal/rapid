import type { FormInstance } from 'ant-design-vue';
import type { UnwrapNestedRefs, Ref, ComputedRef } from 'vue';
import type { ValidateRef, ValidateRefResult } from '@renderer/hooks/useValidate';

export type FormValidateRef = ValidateRef;

export type FormValidateRefResult = ValidateRefResult;

interface AntdVFormRef {
  clearValidate: FormInstance['clearValidate'];

  getFieldsValue: FormInstance['getFieldsValue'];

  resetFields: FormInstance['resetFields'];

  scrollToField: FormInstance['scrollToField'];

  validate: FormInstance['validate'];

  validateFields: FormInstance['validateFields'];

  __v_skip: boolean;
}

export interface LoginFormRef {
  form: UnwrapNestedRefs<{
    username: string;
    password: string;
  }>,
  validate: ValidateRef;
  lastInput: { $el: HTMLInputElement; };
}

export interface RegisterFormRef {
  form: UnwrapNestedRefs<{
    username: string;
    password: string;
    confimPassword: string;
    code: string;
  }>,
  validate: ValidateRef;
  lastInput: { $el: HTMLInputElement; };
}

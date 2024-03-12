import type { Ref } from 'vue';
import { reactive, ref } from 'vue';
import type { FormItemProps, FormInstance } from 'ant-design-vue';
import type { RuleObject } from 'ant-design-vue/es/form/interface';
import { FormItem } from 'ant-design-vue';
import { isPromise } from '@suey/pkg-utils';

type ValidateStateMessage = 'success' | 'warning' | 'error' | 'validating' | '';

export interface Result {
  status: Exclude<ValidateStateMessage, 'validating'>;
  message: string;
}

/**
 * ================================
 * 可参考 @components/Login 组件的使用
 * ================================
 */


/**
 * 创建 FormItem 的验证逻辑, 可以配合下面的函数导出自定义的表单 Ref
 */
export function useValidate<T>(validateF: (value: T) => (Result | Promise<Result>)) {
  const validateStatus = ref<ValidateStateMessage>('');
  const validateMessage = ref<string>('');

  const validateFn = (rule: RuleObject, value: T): Promise<void> => {
    validateStatus.value = 'validating';
    const result = validateF(value);

    if (isPromise(result as unknown as Promise<void>)) {
      return new Promise<void>((resolve, reject) => {
        (result as Promise<Result>).then(res => {
          validateMessage.value = res.message;
          validateStatus.value = res.status;
          resolve();
        }).catch(reject);
      });
    }

    validateMessage.value = (result as Result).message;
    validateStatus.value = (result as Result).status;
    if (['success', 'warning'].includes(validateStatus.value)) {
      return Promise.resolve();
    }
    return Promise.reject();
  }
  return { validateStatus, validateMessage, validateFn };
}

export interface ValidateRefResult {
  status: 'fulfilled' | 'rejected';
  message: string;
  fields: { status: 'fulfilled' | 'rejected', filed: string, value: string, message: string }[];
}

export type ValidateRef = () => Promise<ValidateRefResult>;

/**
 * Form 表单的 Expose Api
 */
export function useValidateRef<T extends Record<string, unknown>, Key extends keyof T, VaFn extends ReturnType<typeof useValidate<T[Key]>>['validateFn']>(
  form: T,
  fields: Partial<Record<Key, VaFn | [VaFn, Ref<string>]>> = {  }
): ValidateRef {

  return () => new Promise((resolve, reject) => {
    const arrPro: Promise<{ filed: string;value: T[Key];message: string; }>[] = [];
    for (const key in fields) {
      arrPro.push(new Promise((resolve, reject) => {
        let fn: VaFn;
        let messageRef = ref('');
        if (typeof fields[key] === 'function') fn = fields[key] as VaFn;
        else {
          const distArr = fields[key] as [VaFn, Ref<string>];
          fn = distArr[0];
          messageRef = distArr[1];
        }
        fn({}, form[key]).then(
          () => resolve({ filed: key, value: form[key], message: messageRef.value })
        ).catch(
          () => reject({ filed: key, value: form[key], message: messageRef.value })
        );
      }));
    }

    Promise.allSettled(arrPro).then(sets => {
      const result: ValidateRefResult = {
        status: 'fulfilled',
        message: '',
        fields: []
      };

      sets.forEach(p => {
        if (p.status === 'fulfilled') {
          result.fields.push({ status: p.status, filed: p.value.filed, value: p.value.value as string, message: p.value.message });
        }
        else {
          if (result.status === 'fulfilled') result.status = 'rejected';
          if (result.message === '') result.message = p.reason.message;
          result.fields.push({ status: p.status, filed: p.reason.filed, value: p.reason.value, message: p.reason.message });
        }
      });

      if (result.status === 'rejected') {
        result.status = 'rejected';
        reject(result);
        return;
      }

      resolve(result);
    });
  });
}

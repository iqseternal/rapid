<template>
  <div/>
</template>

<script lang="ts" setup>
import { reactive, watch, ref } from 'vue';
import type { FormInstance, FormProps } from 'ant-design-vue';
import type { Response } from './api';
import { useModalEvt, useRules, useModalProps, not, and, or } from '@renderer/hooks';
import { message } from 'ant-design-vue';
import { validatorValidStr, validatorRealName, validatorNumberRange } from 'modules/validators';
import Modal from '@components/Modal';

</script>

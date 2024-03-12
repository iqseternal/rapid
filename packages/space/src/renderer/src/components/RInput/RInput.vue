<script lang="tsx">
import type { Ref, Component, SlotsType, EmitsOptions } from 'vue';
import { ref, onMounted, defineComponent, onBeforeUnmount, watch } from 'vue';
import type { InputProps } from 'ant-design-vue';
import { Input } from 'ant-design-vue';
import { useEventListener, useEventListenerForElement } from '@renderer/hooks/useEventListener';

interface RInputProps extends InputProps {

}

export default defineComponent<RInputProps>({
  setup(props, { slots, attrs }) {
    const topic = ref() as Ref<HTMLDivElement>;
    const input = ref() as Ref<{ input: { input: HTMLInputElement; } }>;

    const isFloat = ref(false);

    watch(() => isFloat.value, nv => {
      if (topic.value) {
        if (nv === true) {
          topic.value.style.transform = `translateY(-50%) translateY(-12px)`;
          topic.value.style.color = `rgba(0, 0, 255, .7)`;
          topic.value.style.cursor = 'default';
        }
        else {
          if (!input.value) return;
          if (input.value.input.input.value !== '') return;

          topic.value.style.transform = `translateY(-50%)`;
          topic.value.style.color = `rgba(0, 0, 0, .35)`;
          topic.value.style.cursor = 'text';
        }
      }
    });

    if (attrs.value) onMounted(() => (isFloat.value = true));

    onMounted(() => useEventListenerForElement(input.value.input.input, {
      focus: () => { isFloat.value = true; },
      blur: () => {
        if (input.value.input.input.value === '') isFloat.value = false;
      }
    }));

    useEventListener(topic, 'click', () => {
      if (input.value.input.input.value === '') input.value.input.input.focus();
    });

    return () => (
      <div class="rInput">
        <div ref={topic} class="topic">{slots.topic && slots.topic()}</div>
        <Input ref={input} { ...attrs }>{slots}</Input>
      </div>
    );
  }
});
</script>

<style lang="scss" scoped>
@import "@scss/mixin.scss";
@import "@scss/var.scss";

.rInput {
  width: 320px;
  position: relative;

  .topic {
    z-index: 10;
    font-size: 12px;
    font-family: fantasy;
    color: rgba(0, 0, 0, .35);
    transform: translateY(-50%);
    transition: all .5s ease-out;
    user-select: none;
    position: absolute;
    top: 50%;
    left: 17%;
  }

  &:deep(.ant-input-affix-wrapper) {
    border-radius: 0px;
    padding: 10px 20px;
    background-color: var(--s-main-frame-contain-active-color);
    border: unset;
    outline: unset;
    box-shadow: unset !important;
    width: 100%;
    height: 60px;

    .ant-input-prefix {
      // height: 50px;
      font-size: 20px;
      line-height: 20px;
      margin-inline-end: 15px;
    }

    .ant-input {
      // min-width: 80%;
      font-size: 16px;
      font-family: sans-serif;
      line-height: 18px;
      min-height: 28px !important;
      background: unset;
      margin-top: 15px;

      &::placeholder {
        font-size: 14px;
        line-height: 18px !important;
        color: rgba(0, 0, 0, .2);
        opacity: 0;
        transition: opacity .5s ease-out;
      }

      &:focus {
        &::placeholder {
          opacity: 1;
        }
      }
    }
  }
}
</style>

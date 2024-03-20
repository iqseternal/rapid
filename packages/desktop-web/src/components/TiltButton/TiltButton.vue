<template>
  <div ref="bt" class="button">
    <span>{{ props.text }}</span>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, Ref, effect } from 'vue';

const props = defineProps({
  text: { type: String, default: '' },
  bgColor: { type: String, default: 'black' }
});

const bt = ref() as Ref<HTMLElement>;

effect(() => {
  if (bt.value) {
    bt.value.style.setProperty('--bg-color', props.bgColor);
  }
});

onMounted(() => {
  bt.value.style.setProperty('--bg-color', props.bgColor);
});

defineExpose({

});

</script>

<style lang="scss" scoped>

@mixin tiltButton($color: black) {
  position: relative;

  background-color: $color;
  cursor: pointer;

  color: white;

  border-radius: 10px 0;
  transform: skew(-20deg);

  border: none;
  outline: none;

  text-align: center;


  &::before, &::after {
    content: '';
    position: absolute;
  }

  &::before {
    bottom: 0;
    left: -19px;
    width: 20px;
    height: 20px;
    // border-radius: 100% 0 0 0;

    z-index: 111111;

    background: radial-gradient(
      circle at 0 0,
      transparent 0 19px,
      $color 20px
    );

  }

  &::after {
    top: 0;
    right: -19px;
    width: 20px;
    height: 20px;
    // border-radius: 100% 0 0 0;

    z-index: 111111;

    background: radial-gradient(
      circle at 100% 100%,
      transparent 0 19px,
      $color 20px
    );
  }
}

.button {
  margin-left: 20px;
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
  min-width: 4em;

  box-shadow: 2px -1px 2px 1px gray;

  @include tiltButton(var(--bg-color));
}

</style>

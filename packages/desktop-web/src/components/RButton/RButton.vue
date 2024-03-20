<template>
  <AButton v-bind="$attrs" class="rButton">
    <template v-for="(slot, slotName) in $slots" #[slotName]>
      <slot :name="slotName" />
    </template>
  </AButton>
</template>

<script lang="tsx" setup>

</script>

<style lang="scss" scoped>

.rButton {
  border-radius: 36px;
  padding: 12px 20px;
  font-size: 14px;
  font-family: fantasy;
  line-height: 16px;

  height: 40px;
  width: max-content;
}

</style>

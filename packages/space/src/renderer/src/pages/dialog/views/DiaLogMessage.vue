<template>
  <div>
    {{ route.params }}
  </div>
</template>

<script lang="ts" setup>

import { useRoute } from 'vue-router';

const route = useRoute();

const params = route.params;



</script>

<style lang="scss" scoped>

</style>

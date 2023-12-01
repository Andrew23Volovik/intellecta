<script setup lang="ts">
const modelValue = defineModel<number>();
</script>

<template>
  <div class="w-full bg-truegray-5 rounded-full h-2 lg:h-2.5 dark:bg-truegray-6">
    <div
      class="bg-amber-6 h-2 lg:h-2.5 rounded-full"
      :style="`width: ${modelValue}%`"
    ></div>
  </div>
</template>

<style scoped></style>

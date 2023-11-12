<script setup lang="ts">
const classes = {
  'before:content-empty': true,
  'before:absolute': true,
  'before:top-2/4': true,
  'before:h-1px': true,
  'before:bg-truegray-4': true,
  'before:w-256': true,
  'before:left-full': true,
  'before:ml-2': true,

  'after:content-empty': true,
  'after:absolute': true,
  'after:top-2/4': true,
  'after:h-1px': true,
  'after:bg-truegray-4': true,
  'after:w-256': true,
  'after:right-full': true,
  'after:mr-2': true,
};
</script>

<template>
  <div class="pipeline block text-center overflow-hidden text-truegray-4">
    <span
      class="relative inline-block leading-none"
      :class="classes"
    >
      <slot></slot>
    </span>
  </div>
</template>

<style scoped></style>

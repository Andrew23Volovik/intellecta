<script setup lang="ts">
import type { TCardProps } from '@/types/components/MclCard';
import type { TClassesRecord } from '@/types/types';
import type { ComputedRef } from 'vue';
import { computed } from 'vue';

const props = withDefaults(defineProps<TCardProps>(), {
  link: false,
  padding: false,
  outline: false,
  customClass: '',
});

const darkClasses: TClassesRecord = {
  'dark:bg-dark-3': true,
};

const lightClasses: TClassesRecord = {
  'bg-light-6': true,
};

const linkClasses: TClassesRecord = {
  'hover:bg-light-7': true,
  'hover:border-truegray-4': true,
  'hover:dark:bg-dark-2': true,
  'dark:hover:border-truegray-5': true,
  'cursor-pointer': true,
};

const outlineClasses: TClassesRecord = {
  'dark:border-truegray-6': true,
  'border-truegray-3': true,
  border: true,
  'border-solid': true,
};

const paddingMap: Map<number, string> = new Map([
  [4, 'p-4'],
  [8, 'p-8'],
  [12, 'p-12'],
]);

const resultClasses: ComputedRef<(string | TClassesRecord)[]> = computed(() => {
  return [
    props.padding ? (paddingMap.get(parseInt(props.padding)) as string) : '',
    props.link ? linkClasses : '',
    props.outline ? outlineClasses : '',
    props.customClass,
  ];
});
</script>

<template>
  <div
    class="card"
    :class="[darkClasses, lightClasses, resultClasses]"
  >
    <slot />
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import IconArrowBottom from '@/components/icons/IconArrowBottom.vue';

import type { TSelectProps } from '@/types/components/MclSelect';
import type { Ref } from 'vue';

import { computed, ref } from 'vue';

defineProps<TSelectProps>();
const emits = defineEmits<{
  (e: 'update:modelValue', payload: string): void;
}>();

const isVisible: Ref<boolean> = ref(false);
const chosenVal: Ref<string> = ref('');

const setTitle = (item: string): void => {
  chosenVal.value = item;
  emits('update:modelValue', item);
  isVisible.value = false;
};
const closeSelect = (): void => {
  isVisible.value = false;
};

const lightClasses = {
  'bg-neutral-2': true,
  'border-truegray-4': true,
};
const darkClasses = {
  'dark:bg-dark-3': true,
  'dark:border-truegray-5': true,
};

const resultClasses = computed(() => {
  return [];
});
</script>

<template>
  <div
    data-scope="select"
    class="flex flex-col gap-1 relative"
    v-click-outside="closeSelect"
  >
    <label
      for="select"
      class="block text-sm lg:text-base font-400 text-truegray-8 dark:text-light-6"
    >
      {{ label }}
    </label>
    <button
      class="select"
      :class="[lightClasses, darkClasses, resultClasses]"
      @click="isVisible = !isVisible"
    >
      <span class="text-sm lg:text-base text-truegray-8 dark:text-light-6">{{ !chosenVal ? title : chosenVal }}</span>
      <IconArrowBottom class="w-6 h-6 text-truegray-6" />
    </button>
    <Transition name="fade">
      <div
        id="select-menu"
        class="w-full top-18 absolute z-10 bg-neutral-2 dark:bg-dark-3 p-1 border border-solid rounded-lg border-truegray-3 dark:border-truegray-7 drop-shadow"
        v-if="isVisible"
      >
        <ul class="list-none text-sm lg:text-base text-truegray-8 dark:text-light-6 rounded-lg">
          <li class="px-2 py-1 rounded-lg text-sm">{{ title }}</li>
          <li
            v-for="item in items"
            :key="item"
            class="px-2 py-1 rounded-lg hover:bg-truegray-3 dark:hover:bg-amber-6 cursor-pointer"
            @click="setTitle(item)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </Transition>
    <select
      id="select"
      class="sr-only"
    >
      <option
        v-for="item in items"
        :key="item"
        :value="item"
      >
        {{ item }}
      </option>
    </select>
  </div>
</template>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

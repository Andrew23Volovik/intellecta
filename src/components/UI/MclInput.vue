<script setup lang="ts">
import IconClose from '@/components/icons/IconClose.vue';

import type { ComputedRef } from 'vue';
import type { TInputProps } from '@/types/components/MclInput';
import type { TClassesRecord } from '@/types/types';

import { computed, ref, useSlots } from 'vue';

const props = withDefaults(defineProps<TInputProps>(), {
  type: 'text',
  label: '',
  placeholder: '',
  error: '',
  clearable: false,
});

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string): void;
}>();

const modelValue = defineModel<string>();

const slots = useSlots();

const darkClasses: TClassesRecord = {
  'dark:bg-dark-3': true,
  'dark:border-truegray-5': true,
  'dark:text-light-6': true,
  'dark:placeholder:text-truegray-5': true,
  'dark:focus:border-amber-6/75': true,
};

const lightClasses: TClassesRecord = {
  'bg-neutral-2': true,
  'border-truegray-4': true,
  'text-truegray-8': true,
  'placeholder:text-truegray-4': true,
  'focus:border-amber-6/75': true,
};

const resultClasses: ComputedRef<(string | TClassesRecord)[]> = computed(() => {
  return [slots.leftIcon ? 'pl-10' : '', props.error ? 'error' : ''];
});

const isFocused = ref(false);

const iconStyle = computed(() => {
  if (props.error) {
    return '#dc2626';
  } else if (isFocused.value) {
    return '#d97706';
  } else {
    return '#a3a3a3';
  }
});

const clearable = () => {
  emits('update:modelValue', '');
};
</script>

<template>
  <div class="input-group relative flex flex-col gap-1">
    <label
      :for="`input-${props.type}-${props.placeholder}`"
      class="block text-sm font-medium text-truegray-6 dark:text-truegray-4"
      v-if="props.label"
    >
      {{ props.label }}
    </label>
    <div class="inline-flex relative">
      <div
        class="svg absolute inset-y-0 flex items-center pl-2 pointer-events-none"
        v-if="slots.leftIcon"
      >
        <slot name="leftIcon"></slot>
      </div>
      <input
        :type="props.type"
        :id="`input-${props.type}-${props.placeholder}`"
        :class="[darkClasses, lightClasses, resultClasses, `input ${props.customClass}`]"
        :placeholder="props.placeholder"
        v-model.trim="modelValue"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
      <div
        class="absolute inset-y-0 flex items-center right-0 pr-2"
        v-if="slots.rightIcon"
      >
        <IconClose
          class="mr-2 self-center text-truegray-6 hover:text-amber-6 ease-in-out transition-500 w-6 h-6"
          v-if="modelValue && props.clearable"
          @click="clearable"
        />
        <slot name="rightIcon"></slot>
      </div>
    </div>
    <small
      v-if="error"
      class="text-red-6 items-end"
    >
      {{ error }}
    </small>
  </div>
</template>

<style scoped lang="scss">
.error {
  border: 1px solid #dc2626;
  &:focus {
    border: 1px solid #dc2626;
  }
}

.svg:deep(svg) {
  transition: 0.4s all ease-in-out;
  color: v-bind('iconStyle');
}

input[type='search']::-webkit-search-cancel-button {
  -webkit-appearance: none;
}
</style>

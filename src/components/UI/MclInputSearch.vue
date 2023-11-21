<script setup lang="ts">
import MclButton from '@/components/UI/MclButton.vue';
import MclInput from '@/components/UI/MclInput.vue';
import type { TInputSearchProps } from '@/types/components/MclInputSearch';
import { useSlots } from 'vue';

const props = defineProps<TInputSearchProps>();

const slots = useSlots();

const modelValue = defineModel<string>();
</script>

<template>
  <form>
    <label
      for="default-search"
      class="mb-2 text-sm font-medium text-truegray-6 sr-only dark:text-light-6"
    >
      Search
    </label>
    <div class="relative">
      <MclInput
        type="search"
        id="default-search"
        placeholder="Send a message"
        custom-class="lg:py-4 pr-22 lg:pr-28"
        v-model="modelValue"
        :error="error"
        clearable
      >
        <template
          #leftIcon
          v-if="slots.default"
        >
          <slot name="default" />
        </template>
        <template #rightIcon>
          <MclButton
            type="submit"
            class="py-0 sm:py-1 md:py-1.25 xl:py-2.5 text-sm md:text-base"
          >
            Search
          </MclButton>
        </template>
      </MclInput>
    </div>
  </form>
</template>

<style scoped></style>

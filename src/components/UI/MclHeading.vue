<script setup lang="ts">
import type { THeadingProps } from '@/types/components/MclHeading';

defineProps<THeadingProps>();
</script>

<template>
  <div class="flex items-center gap-x-2 mb-8">
    <Component
      :is="icon"
      class="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 text-amber-6 bg-amber-6/10 rounded-lg p-1"
    />
    <div>
      <h2 class="text-lg md:text-xl lg:text-2xl font-500 tracking-widest dark:text-light-6 text-truegray-8">
        {{ title }}
      </h2>
      <p class="text-xs md:text-base dark:text-truegray-3 text-truegray-6 text-justify">{{ description }}</p>
    </div>
  </div>
</template>

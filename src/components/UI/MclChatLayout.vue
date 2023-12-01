<script setup lang="ts">
import MclCard from '@/components/UI/MclCard.vue';
import IntellectaLogo from '@/components/icons/IntellectaLogo.vue';
import IconLoader from '@/components/icons/IconLoader.vue';
import MclButton from '@/components/UI/MclButton.vue';

import type { TChatLayoutProps } from '@/types/components/MclChatLayout';
import type { Ref, ComponentPublicInstance } from 'vue';

import { watch, ref } from 'vue';

defineProps<TChatLayoutProps>();
defineEmits<{
  (e: 'clearChat'): void;
}>();

const loader: Ref<ComponentPublicInstance<HTMLDivElement> | undefined> = ref();
watch(
  () => loader.value,
  (value) => {
    if (value && loader.value instanceof HTMLDivElement) {
      loader.value.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  },
);
</script>

<template>
  <div class="flex flex-col gap-4 my-8">
    <template
      v-for="({ role, content }, idx) in messages"
      :key="idx"
    >
      <MclCard
        class="grid grid-cols-1] gap-2 sm:grid-cols-[4rem_1fr] md:gap-0 items-center"
        :outline="role === 'assistant'"
        :custom-class="role === 'user' ? '!dark:bg-truegray-7 !bg-truegray-3' : ''"
      >
        <img
          class="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full"
          src="https://avatars.githubusercontent.com/u/37669722?v=4"
          alt="Rounded avatar"
          v-if="role === 'user'"
        />
        <IntellectaLogo
          class="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-amber-6"
          v-else
        />
        <slot :content="content" />
      </MclCard>
    </template>
    <div
      v-if="isLoading"
      role="status"
      class="flex items-center justify-center h-32 dark:bg-truegray-7 bg-light-7 rounded-lg animate-pulse"
      ref="loader"
    >
      <IconLoader class="text-amber-6 w-8 h-8" />
      <span class="sr-only">Loading...</span>
    </div>
    <MclButton
      v-if="messages.length"
      class="self-center"
      @click="$emit('clearChat')"
    >
      Clear chat
    </MclButton>
  </div>
</template>

<style scoped></style>

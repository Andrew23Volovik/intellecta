<script setup lang="ts">
import MclButton from '@/components/UI/MclButton.vue';
import IconAvatar from '@/components/icons/IconAvatar.vue';

import type { TAvatarDropdown } from '@/types/components/MclAvatarDropdown';
import type { Ref } from 'vue';

import { ref } from 'vue';

defineProps<TAvatarDropdown>();
const emits = defineEmits<{
  (e: 'sing-out'): void;
}>();

const isVisible: Ref<boolean> = ref(false);
const closeDropdown = () => {
  isVisible.value = false;
};
</script>

<template>
  <div
    class="flex flex-col justify-center gap-1 relative"
    v-click-outside="closeDropdown"
  >
    <MclButton
      icon-btn
      @click="isVisible = !isVisible"
      size="small"
      class="self-end"
    >
      <IconAvatar />
    </MclButton>
    <Transition name="fade">
      <div
        id="select-menu"
        class="w-48 top-14 right-2 absolute z-10 bg-neutral-2 dark:bg-dark-3 border border-solid rounded-lg border-truegray-3 dark:border-truegray-7 drop-shadow"
        v-if="isVisible"
      >
        <div
          class="flex flex-col text-truegray-8 dark:text-light-6 p-2 border border-b-solid border-b-truegray-3 dark:border-b-truegray-7"
        >
          <div class="flex gap-2 text-md">
            <span>{{ firstName }}</span>
            <span>{{ lastName }}</span>
          </div>
          <span class="text-sm font-500">{{ email }}</span>
        </div>
        <div class="text-truegray-8 dark:text-light-6 p-2">
          <p
            class="text-md font-500 cursor-pointer hover:text-amber-6"
            @click="emits('sing-out')"
          >
            Sing Out
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped></style>

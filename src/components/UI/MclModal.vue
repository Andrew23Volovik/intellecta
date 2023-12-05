<script setup lang="ts">
import IconClose from '@/components/icons/IconClose.vue';

const props = defineProps<{ open: boolean }>();

const emits = defineEmits<{
  (e: 'close'): void;
}>();
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        class="fixed top-0 right-0 left-0 bottom-0 h-full w-full backdrop-blur-md flex justify-center items-center z-999"
        v-show="props.open"
      >
        <div
          id="select-modal"
          class="relative bg-neutral-2 dark:bg-dark-4 rounded-lg z-1000 border border-solid border-truegray-3 dark:border-truegray-6"
          v-click-outside="() => emits('close')"
        >
          <IconClose
            class="absolute w-6 h-6 right-0 m-2 text-truegray-6 hover:text-amber-6 ease-in-out transition-500"
            @click="emits('close')"
          />
          <div class="border-b-1 border-b-solid border-truegray-3 dark:border-b-truegray-6 w-full p-4">
            <slot name="header"></slot>
          </div>
          <slot name="main"></slot>
          <div class="border-t-1 border-t-solid border-truegray-3 dark:border-t-truegray-6 p-4 mx-a">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
</style>

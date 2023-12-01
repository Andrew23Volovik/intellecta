<script setup lang="ts">
import type { Ref } from 'vue';

import { onMounted, ref } from 'vue';
import { useSwipe } from '@/composables/useSwipe';
import { useRoute, useRouter } from 'vue-router';
import { navigationLinkNames } from '@/const';
import { useBreakpoints } from '@/composables/useBreakpoints';

const touchedArea: Ref<any> = ref();

const currNavIdx: Ref<number> = ref(0);
const router = useRouter();
const { screenType } = useBreakpoints();
useSwipe<typeof touchedArea>(touchedArea, {
  onSwipeLeft() {
    if (screenType.value === 'sm') {
      currNavIdx.value++;
      if (currNavIdx.value >= navigationLinkNames.length) currNavIdx.value = 0;
      router.push({ name: navigationLinkNames[currNavIdx.value] });
    }
  },
  onSwipeRight() {
    if (screenType.value === 'sm') {
      currNavIdx.value--;
      if (currNavIdx.value < 0) currNavIdx.value = navigationLinkNames.length - 1;
      router.push({ name: navigationLinkNames[currNavIdx.value] });
    }
  },
});

const route = useRoute();
onMounted(() => {
  currNavIdx.value = navigationLinkNames.findIndex((link: string) => link === route.name);
});
</script>

<template>
  <main
    ref="touchedArea"
    class="main h-full bg-neutral-2 dark:bg-dark-5 border-b-1 border-b-solid border-b-truegray-3 dark:border-b-truegray-6 z-1"
  >
    <RouterView />
  </main>
</template>

<style scoped></style>

<script setup lang="ts">
import type { Ref } from 'vue';
import type { TNavigationLinks } from '@/types/components/MclAside';

import { defineAsyncComponent, markRaw, ref } from 'vue';
import { navigationLinkNames } from '@/const';

const mobileNavLinkData: Ref<TNavigationLinks[]> = ref([]);

navigationLinkNames.forEach((name: string) => {
  mobileNavLinkData.value.push({
    title: name,
    icon: markRaw(defineAsyncComponent(() => import(`@/components/icons/app/${name}Icon.vue`))),
  });
});
</script>

<template>
  <nav class="p-2 border-b-solid border-b-1 border-b-truegray-3 dark:border-b-truegray-6">
    <ul class="flex justify-evenly list-none">
      <li
        v-for="({ title, icon }, idx) in mobileNavLinkData"
        :key="idx"
      >
        <RouterLink
          :to="{ name: title }"
          v-slot="{ isActive }"
          class="flex flex-col items-center gap-1"
        >
          <Component
            :is="icon"
            class="w-4 h-4 text-truegray-4"
            :class="{ 'router-active-icon': isActive }"
          />
          <span
            class="w-6 h-2px rounded bg-truegray-4"
            :class="{ 'router-active-indicator': isActive }"
          />
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.router-active-icon {
  color: rgb(217 119 6 / var(--un-bg-opacity));
}
.router-active-indicator {
  background-color: rgb(217 119 6 / var(--un-bg-opacity));
}
</style>

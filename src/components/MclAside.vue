<script setup lang="ts">
import IntellectaLogo from '@/components/icons/IntellectaLogo.vue';
import type { NavigationLinks } from '@/types/components/MclAside';
import type { Ref } from 'vue';
import { ref, defineAsyncComponent, markRaw } from 'vue';
import { dashboardIconsMap } from '@/helpers/dashboardIconsMap';
import { navigationLinkNames } from '@/const';

const asideLinkData: Ref<NavigationLinks[]> = ref([]);

navigationLinkNames.forEach((name: string) => {
  asideLinkData.value.push({
    title: name,
    icon: markRaw(defineAsyncComponent(() => import(dashboardIconsMap[name]))),
  });
});
</script>

<template>
  <aside
    class="bg-neutral-6 dark:bg-dark-3 border-r-1 border-r-solid border-r-truegray-3 dark:border-r-truegray-6 z-11"
  >
    <RouterLink
      :to="{ name: 'Landing' }"
      class="flex items-center justify-between py-2 px-4 gap-4 cursor-pointer lg:px-6 xl:py-4 xl:px-8"
    >
      <h1 class="text-xl font-700 tracking-widest text-light-6 hidden lg:block xl:text-4xl">INTELLECTA</h1>
      <IntellectaLogo class="c-amber-6 h-10 w-10 xl:h-16 xl:w-16" />
    </RouterLink>
    <nav class="px-2 xl:px-4">
      <ul class="flex flex-col text-base font-400 lg:text-xl xl:font-500">
        <RouterLink
          v-for="({ title, icon }, idx) in asideLinkData"
          :key="idx"
          :to="{ name: title }"
          class="flex items-center gap-2 py-1.5 px-4 text-truegray-2 dark:text-truegray-4 rounded-lg cursor-pointer ease-in-out duration-500 hover:bg-amber-6 hover:shadow-lg hover:text-light-6"
        >
          <Component
            :is="icon"
            class="w-4 h-4 lg:w-6 lg:h-6 xl:w-8 xl:h-8"
          />
          <span>{{ title }}</span>
        </RouterLink>
      </ul>
    </nav>
  </aside>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import MclCard from '@/components/UI/MclCard.vue';
import IconArrowRight from '@/components/icons/IconArrowRight.vue';

import type { Ref } from 'vue';
import type { TNavigationLinks } from '@/types/components/MclAside';

import { defineAsyncComponent, markRaw, ref } from 'vue';
import { navigationLinkNames } from '@/const';

const dashboardNavigation: Ref<TNavigationLinks[]> = ref([]);

navigationLinkNames.forEach((name: string) => {
  dashboardNavigation.value.push({
    title: name,
    icon: markRaw(defineAsyncComponent(() => import(`../../components/icons/app/${name}Icon.vue`))),
  });
});
</script>

<template>
  <section class="flex flex-col items-center">
    <div class="text-center my-4 lg:my-6">
      <h2 class="text-2xl sm:text-3xl md:text-3xl xl:text-5xl font-500 text-truegray-8 dark:text-light-6">
        Explore the power of AI
      </h2>
      <span class="block mt-2 text-sm lg:text-lg text-truegray-6 dark:text-truegray-4">
        Chat with smartest AI - Explore the power of AI
      </span>
    </div>
    <ul class="list-none w-64 sm:w-sm md:w-md lg:w-lg xl:w-3xl">
      <li
        v-for="({ title, icon }, idx) in dashboardNavigation"
        :key="idx"
        class="my-4 group/item"
      >
        <RouterLink :to="{ name: title }">
          <MclCard
            class="flex items-center justify-between gap-4"
            link
          >
            <div class="flex items-center gap-x-xl">
              <Component
                :is="icon"
                class="icon p-1 text-amber-6 bg-amber-6/15 rounded-lg"
              />
              <span class="text-sm font-500 text-truegray-6 dark:text-light-6 md:text-base lg:text-lg xl:text-xl">
                {{ title }}
              </span>
            </div>
            <IconArrowRight
              class="icon text-truegray-6 dark:text-light-6 group-hover/item:text-amber-6 ease-in-out transition-500"
            />
          </MclCard>
        </RouterLink>
      </li>
    </ul>
  </section>
</template>

<style scoped></style>

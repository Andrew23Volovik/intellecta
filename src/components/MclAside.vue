<script setup lang="ts">
import type { TNavigationLinks } from '@/types/components/MclAside';
import type { Ref, ComputedRef } from 'vue';

import IntellectaLogo from '@/components/icons/IntellectaLogo.vue';
import MclButton from '@/components/UI/MclButton.vue';
import IconLightning from '@/components/icons/IconLightning.vue';
import MclProgress from '@/components/UI/MclProgress.vue';

import { ref, defineAsyncComponent, markRaw, computed } from 'vue';
import { dashboardIconsMap } from '@/helpers/dashboardIconsMap';
import { navigationLinkNames } from '@/const';
import { MAX_COUNT } from '@/server/utils';
import { useUserStore } from '@/stores/user';
import { useModal } from '@/stores/modal';

const storeModal = useModal();

const asideLinkData: Ref<TNavigationLinks[]> = ref([]);

navigationLinkNames.forEach((name: string) => {
  asideLinkData.value.push({
    title: name,
    icon: markRaw(defineAsyncComponent(() => import(dashboardIconsMap[name]))),
  });
});

const store = useUserStore();
store.userApiLimit();
store.stripeCheckSubscriptionStatus();

const progress: ComputedRef<number> = computed(() => {
  if (store.supabaseSession) {
    return (store.getApiCount / MAX_COUNT) * 100;
  }
  return 0;
});
</script>

<template>
  <aside
    class="fixed flex flex-col justify-between h-full top-0 sm:w-48 lg:w-64 xl:w-104 bg-neutral-6 dark:bg-dark-3 border-r-1 border-r-solid border-r-truegray-3 dark:border-r-truegray-6 z-100"
  >
    <div>
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
    </div>
    <Transition
      name="fade"
      mode="out-in"
    >
      <div
        class="border border-t-solid border-truegray-5 dark:border-truegray-6 p-4 xl:p-8"
        v-if="!store.isUpgrade"
      >
        <p class="text-center text-light-6 text-sm font-500 mb-2">{{ store.getApiCount }} / {{ MAX_COUNT }}</p>
        <MclProgress
          class="mb-4"
          v-model="progress"
        />
        <MclButton
          class="m-a w-full bg-gradient-to-r from-violet-8 to-amber-6 hover:from-violet-7 hover:to-amber-5"
          @click="storeModal.onOpen()"
        >
          <template #icon-left>
            <IconLightning class="text-light-6 w-6 h-6" />
          </template>
          Upgrade
        </MclButton>
      </div>
    </Transition>
  </aside>
</template>

<style scoped lang="scss"></style>

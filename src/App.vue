<script setup lang="ts">
import MclModal from '@/components/UI/MclModal.vue';
import MclButton from '@/components/UI/MclButton.vue';
import IconArrowRight from '@/components/icons/IconArrowRight.vue';
import MclCard from '@/components/UI/MclCard.vue';
import IconLightning from '@/components/icons/IconLightning.vue';

import type { Ref, DefineComponent } from 'vue';

import { useAIStore } from '@/stores/artificialIntelligence';
import { useUserStore } from '@/stores/user';
import { onUnmounted, defineAsyncComponent, markRaw, ref } from 'vue';
import { navigationLinkNames } from '@/const';
import { dashboardIconsMap } from '@/helpers/dashboardIconsMap';
import { useModal } from '@/stores/modal';

const storeModal = useModal();

const modalNavigation: Ref<
  {
    title: string;
    icon: DefineComponent;
  }[]
> = ref([]);

navigationLinkNames.slice(0, navigationLinkNames.length - 1).forEach((name: string) => {
  modalNavigation.value.push({
    title: name,
    icon: markRaw(defineAsyncComponent(() => import(dashboardIconsMap[name]))),
  });
});

const { $patch } = useAIStore();
$patch({ init: true });

const { initSupabaseSession, stripeSubscription } = useUserStore();

const upgrade = async () => {
  const data = await stripeSubscription();

  if ('url' in data) {
    window.location.href = data.url;
  }
};

let unsubscribe: () => void;
initSupabaseSession().then((fn) => (unsubscribe = fn));

onUnmounted(() => unsubscribe());
</script>

<template>
  <RouterView />
  <MclModal
    :open="storeModal.isOpen"
    @close="storeModal.onClose"
  >
    <template #header>
      <div class="flex items-center gap-2 justify-center">
        <h2 class="text-truegray-8 dark:text-light-6 text-sm font-500 hidden sm:block md:text-2xl">
          Upgrade to Intellecta
        </h2>
        <span class="bg-amber-6 py-1 px-2 rounded-lg text-sm text-light-6 md:text-base"> PRO </span>
      </div>
    </template>
    <template #main>
      <ul class="list-none w-64 sm:w-sm md:w-md px-4">
        <li
          v-for="({ title, icon }, idx) in modalNavigation"
          :key="idx"
          class="my-4 group/item"
        >
          <MclCard
            class="flex items-center justify-between gap-4"
            link
            padding="4"
          >
            <div class="flex items-center gap-x-sm">
              <Component
                :is="icon"
                class="p-1 text-amber-6 bg-amber-6/15 rounded-lg w-6 h-6 md:w-8 md:h-8"
              />
              <span class="text-sm font-500 text-truegray-6 dark:text-light-6 md:text-base">
                {{ title }}
              </span>
            </div>
            <IconArrowRight
              class="text-truegray-6 dark:text-light-6 group-hover/item:text-amber-6 ease-in-out transition-500 w-6 h-6 md:w-8 md:h-8"
            />
          </MclCard>
        </li>
      </ul>
    </template>
    <template #footer>
      <MclButton
        class="w-full bg-gradient-to-r from-violet-8 to-amber-6 hover:from-violet-7 hover:to-amber-5"
        @click="upgrade"
      >
        <template #icon-left>
          <IconLightning class="w-6 h-6 text-light-6" />
        </template>
        Upgrade
      </MclButton>
    </template>
  </MclModal>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Clash Display', sans-serif;
}

a {
  color: black;
  text-decoration: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

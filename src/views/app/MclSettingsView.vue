<script setup lang="ts">
import MclHeading from '@/components/UI/MclHeading.vue';
import MclLayout from '@/components/MclLayout.vue';
import MclButton from '@/components/UI/MclButton.vue';

import type { THeadingProps } from '@/types/components/MclHeading';

import { defineAsyncComponent } from 'vue';
import { useUserStore } from '@/stores/user';

const settingsHeadingData: THeadingProps = {
  title: 'Settings',
  description: 'Manage account settings.',
  icon: defineAsyncComponent(() => import('@/components/icons/app/SettingsIcon.vue')),
};

const userStore = useUserStore();
const store = useUserStore();
const manageSubscription = async () => {
  try {
    await store.stripeSubscription();
  } catch (e) {
    console.log(e);
  }
};
</script>

<template>
  <section class="flex flex-col">
    <MclLayout>
      <MclHeading
        :title="settingsHeadingData.title"
        :description="settingsHeadingData.description"
        :icon="settingsHeadingData.icon"
      />
      <h2 class="text-3xl font-500 text-truegray-8 dark:text-light-6">
        {{ userStore.isUpgrade ? 'You are currently on a Pro plan.' : 'You are currently on a free plan.' }}
      </h2>
      <div class="py-4">
        <Transition
          name="fade"
          mode="out-in"
        >
          <MclButton
            v-if="userStore.isUpgrade"
            @click="manageSubscription"
          >
            Manage Subscription
          </MclButton>
          <MclButton
            v-else
            @click="manageSubscription"
          >
            Upgrade
          </MclButton>
        </Transition>
      </div>
    </MclLayout>
  </section>
</template>

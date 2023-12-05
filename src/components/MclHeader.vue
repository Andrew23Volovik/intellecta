<script setup lang="ts">
import MclAvatarDropdown from '@/components/UI/MclAvatarDropdown.vue';

import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import MclThemeSwitcher from '@/components/UI/MclThemeSwitcher.vue';

const store = useUserStore();
const router = useRouter();
const singOut = () => {
  store.singOut();

  router.push({ name: 'Landing' });
};
</script>

<template>
  <header
    class="flex justify-end bg-neutral-2 dark:bg-dark-5 border-b-solid border-b-truegray-3 dark:border-b-truegray-6 border-b-1 z-10"
  >
    <MclThemeSwitcher />
    <MclAvatarDropdown
      :first-name="store.getUser!.user_metadata.firstName"
      :last-name="store.getUser!.user_metadata.lastName"
      :email="store.getUser!.email as string"
      class="p-2"
      @sing-out="singOut"
    />
  </header>
</template>

<style scoped lang="scss"></style>

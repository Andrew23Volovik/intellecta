<script setup lang="ts">
import IntellectaLogo from '@/components/icons/IntellectaLogo.vue';

const dashboardData = [
  {
    title: 'Dashboard',
  },
  {
    title: 'Conversation',
  },
  {
    title: 'Image Generation',
  },
  {
    title: 'Video Generation',
  },
  {
    title: 'Music Generation',
  },
  {
    title: 'Code Generation',
  },
  {
    title: 'Settings',
  },
];
</script>

<template>
  <aside class="aside bg-neutral-6 dark:bg-dark-4 border-r-1 border-r-solid border-r-truegray-6 drop-shadow-lg z-10">
    <RouterLink
      :to="{ name: 'Dashboard' }"
      class="flex items-center justify-between py-4 px-8 gap-4 cursor-pointer"
    >
      <h1 class="text-4xl font-700 tracking-widest text-light-6">INTELLECTA</h1>
      <IntellectaLogo class="c-amber-6 h-16 w-16" />
    </RouterLink>
    <nav class="px-4">
      <ul class="flex flex-col text-xl font-400">
        <RouterLink
          v-for="(obj, idx) in dashboardData"
          :key="idx"
          :to="{ name: obj.title }"
          class="py-1.5 px-4 text-truegray-2 dark:text-truegray-4 rounded-lg cursor-pointer ease-in-out duration-500 hover:bg-amber-6 hover:shadow-lg hover:text-light-6"
        >
          <span>{{ obj.title }}</span>
        </RouterLink>
      </ul>
    </nav>
  </aside>
</template>

<style scoped lang="scss">
.aside {
  grid-area: aside;
}
</style>

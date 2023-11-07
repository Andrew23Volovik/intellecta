<script setup lang="ts">
import MclHeader from '@/components/MclHeader.vue';
import MclMain from '@/components/MclMain.vue';
import MclFooter from '@/components/MclFooter.vue';
import MclAside from '@/components/MclAside.vue';
import { useBreakpoints } from '@/composables/useBreakpoints';
import MclMobileNav from '@/components/MclMobileNav.vue';

const { screenType } = useBreakpoints();
</script>

<template>
  <main
    class="h-screen grid grid-cols-[1fr] sm:grid-cols-[12rem_4fr] lg:grid-cols-[16rem_4fr] xl:grid-cols-[1fr_4fr] overflow-hidden"
  >
    <MclAside v-if="screenType !== 'sm'" />
    <section class="grid grid-rows-[3rem_2.5rem_1fr_1rem] sm:grid-rows-[4rem_1fr_1rem]">
      <MclHeader />
      <MclMobileNav v-if="screenType == 'sm'" />
      <MclMain />
      <MclFooter />
    </section>
  </main>
</template>

<style scoped lang="scss"></style>

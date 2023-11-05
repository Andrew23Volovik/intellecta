<script setup lang="ts">
import MclHeader from '@/components/MclHeader.vue';
import MclMain from '@/components/MclMain.vue';
import MclFooter from '@/components/MclFooter.vue';
import MclAside from '@/components/MclAside.vue';
</script>

<template>
  <main class="wrapper__main h-screen">
    <MclAside />
    <section class="flex flex-col">
      <MclHeader />
      <MclMain />
      <MclFooter />
    </section>
  </main>
</template>

<style scoped lang="scss">
.wrapper__main {
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-template-areas: 'aside header';
}
</style>

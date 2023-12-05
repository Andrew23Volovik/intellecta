<script setup lang="ts">
import IntellectaLogo from '@/components/icons/IntellectaLogo.vue';
import IonicIcon from '@/components/icons/landing/IonicIcon.vue';
import OpenAiIcon from '@/components/icons/landing/OpenAiIcon.vue';
import ShopifyIcon from '@/components/icons/landing/ShopifyIcon.vue';
import SolidIcon from '@/components/icons/landing/SolidIcon.vue';
import StepsizqIcon from '@/components/icons/landing/StepsizqIcon.vue';
import HandlessIcon from '@/components/icons/landing/HandlessIcon.vue';
import MclButton from '@/components/UI/MclButton.vue';
import MclCard from '@/components/UI/MclCard.vue';
import MclThemeSwitcher from '@/components/UI/MclThemeSwitcher.vue';
import { useRouter } from 'vue-router';

const landingIcons = [
  {
    title: 'Ionic',
    comp: IonicIcon,
  },
  {
    title: 'Open AI',
    comp: OpenAiIcon,
  },
  {
    title: 'Shopify',
    comp: ShopifyIcon,
  },
  {
    title: 'Solid',
    comp: SolidIcon,
  },
  {
    title: 'Stepsizq',
    comp: StepsizqIcon,
  },
  {
    title: 'Handless',
    comp: HandlessIcon,
  },
];

const router = useRouter();
</script>

<template>
  <main class="main grid grid-rows-[4rem_1fr_1rem] h-screen bg-light-6 md:grid-rows-[6rem_1fr_1rem]">
    <header
      class="bg-gradient-to-r from-violet-8 via-amber-6 to-violet-8 dark:bg-dark-4 border-b-solid border-b-1 border-b-truegray-6 shadow-xl z-10"
    >
      <nav
        class="flex items-center justify-between max-w-xl mx-auto md:max-w-xl py-3 px-3 md:py-4 md:px-4 md:max-w-2xl lg:max-w-4xl xl:max-w-6xl"
      >
        <RouterLink
          :to="{ name: 'Landing' }"
          class="flex items-center gap-4"
        >
          <IntellectaLogo class="text-amber-6 h-10 w-10 md:h-16 md:w-16" />
          <h2 class="text-light-6 text-2xl tracking-wide hidden sm:block md:text-4xl">Intellecta</h2>
        </RouterLink>

        <div class="flex items-center gap-4">
          <MclButton
            class="w-48"
            @click="router.push({ name: 'Auth' })"
          >
            Get Started
          </MclButton>
          <MclThemeSwitcher />
        </div>
      </nav>
    </header>
    <main class="bg-neutral-2 dark:bg-dark-5 flex flex-col justify-center items-center gap-16 py-16">
      <h1
        class="text-truegray-8 text-3xl text-center tracking-wide max-w-72 select-none md:text-5xl sm:max-w-7xl md:text-4xl xl:text-6xl dark:text-light-6"
      >
        Welcome to <span class="text-amber-6">Intellecta!</span>
      </h1>
      <p
        class="max-w-72 font-400 text-truegray-6 text-sm indent-6 text-justify select-none sm:max-w-xl sm:text-base md:max-w-xl xl:max-w-4xl dark:text-truegray-4"
      >
        Step into a realm where human ingenuity and artificial intelligence converge, opening doors to unparalleled
        possibilities. Our platform is your gateway to the future, a place where AI-driven innovation is at the
        forefront. Whether you're a passionate tech aficionado, a curious explorer, or a forward-thinking business
        leader, you've arrived at the nexus of AI's limitless potential. 🚀
      </p>
      <MclButton
        class="w-72"
        @click="router.push({ name: 'Dashboard' })"
      >
        Start Generating For Free
      </MclButton>
      <div class="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <MclCard
          class="flex justify-center items-center gap-4"
          v-for="({ title, comp }, idx) in landingIcons"
          :key="idx"
          outline
        >
          <Component
            :is="comp"
            class="grayscale w-8 h-8"
          />
          <h3 class="text-xl font-400 text-truegray-6">{{ title }}</h3>
        </MclCard>
      </div>
    </main>
    <footer
      class="bg-gradient-to-r from-violet-8 via-amber-6 to-violet-8 border-t-solid border-t-1 border-t-truegray-6 z-10"
    ></footer>
  </main>
</template>

<style scoped lang="scss"></style>

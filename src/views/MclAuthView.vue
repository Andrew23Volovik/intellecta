<script setup lang="ts">
import type { AsyncComponentLoader, Component, ComputedRef, Ref } from 'vue';
import { computed, defineAsyncComponent, ref } from 'vue';
import MclCard from '@/components/UI/MclCard.vue';

interface AuthListComponents {
  singUp: Component;
  singIn: Component;
}
const createAsyncComp = (name: string): AsyncComponentLoader => {
  return defineAsyncComponent(() => import(`@/components/auth/Mcl${name}.vue`));
};

const listComp: AuthListComponents = {
  singUp: createAsyncComp('SingUp'),
  singIn: createAsyncComp('SingIn'),
};

const singMethod: Ref<'singUp' | 'singIn'> = ref('singUp');
const currComp: ComputedRef<Component> = computed(() => listComp[singMethod.value]);

const changeSingMethod = (): void => {
  if (singMethod.value === 'singUp') {
    singMethod.value = 'singIn';
  } else {
    singMethod.value = 'singUp';
  }
};

const changeToSingInComp = (): void => {
  singMethod.value = 'singIn';
};
</script>

<template>
  <section class="h-full flex justify-center items-center dark:bg-dark-6 bg-neutral-2">
    <MclCard class="w-64 sm:w-84">
      <Transition
        name="slide-up"
        mode="out-in"
      >
        <h2
          class="dark:text-light-6 text-truegray-6 text-2xl font-medium"
          v-if="singMethod === 'singUp'"
        >
          Sing Up
        </h2>
        <h2
          class="dark:text-light-6 text-truegray-6 text-2xl font-medium"
          v-else
        >
          Sing In
        </h2>
      </Transition>
      <span class="text-truegray-4">to continue Intellecta</span>
      <Transition
        name="fade"
        mode="out-in"
      >
        <Component
          :is="currComp"
          @change-auth-comp="changeToSingInComp"
        />
      </Transition>
      <p class="dark:text-light-6 text-truegray-6">
        No account?
        <span
          class="ml-2 dark:text-amber-6 text-amber-6 cursor-pointer"
          @click="changeSingMethod"
        >
          {{ singMethod === 'singUp' ? 'Sing In' : 'Sing Up' }}
        </span>
      </p>
    </MclCard>
  </section>
</template>

<style scoped lang="scss">
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

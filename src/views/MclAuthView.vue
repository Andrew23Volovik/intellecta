<script setup lang="ts">
import type { AsyncComponentLoader, Component, Ref } from 'vue';
import { computed, defineAsyncComponent, ref } from 'vue';
import { supabase } from '@/supabase';

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
const currComp = computed(() => listComp[singMethod.value]);

const changeSingMethod = () => {
  if (singMethod.value === 'singUp') {
    singMethod.value = 'singIn';
  } else {
    singMethod.value = 'singUp';
  }
};

const logOut = () => {
  supabase.auth.signOut();
};

const changeToSingInComp = () => {
  singMethod.value = 'singIn';
};
</script>

<template>
  <section class="h-full flex justify-center items-center dark:bg-dark-6 bg-neutral-2">
    <div
      class="dark:bg-dark-4 w-64 sm:w-84 bg-light-6 p-8 border-1 border-solid border-truegray-6 rounded-lg drop-shadow-lg"
    >
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
    </div>
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

<script setup lang="ts">
import MclButton from '@/components/UI/MclButton.vue';
import IconLightMode from '@/components/icons/IconLightMode.vue';
import IconDarkMode from '@/components/icons/IconDarkMode.vue';
import { useDark } from '@/composables/useDark';

const { isDark, toggleTheme } = useDark();
</script>

<template>
  <div class="flex flex-col justify-center p-2">
    <MclButton
      @click="toggleTheme"
      icon-btn
      size="small"
    >
      <Transition
        name="fade"
        mode="out-in"
      >
        <IconLightMode v-if="isDark" />
        <IconDarkMode v-else />
      </Transition>
    </MclButton>
  </div>
</template>

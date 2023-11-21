<script setup lang="ts">
import { useSupabaseUser } from '@/composables/useSupabaseUser';
import { supabase } from '@/lib/supabase';
import { useOpenAIStore } from '@/stores/openAI';

useSupabaseUser(supabase);

const { $patch } = useOpenAIStore();
$patch({ init: true });
</script>

<template>
  <RouterView />
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
</style>

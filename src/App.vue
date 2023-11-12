<script setup lang="ts">
import { useSupabaseUser } from '@/composables/useSupabaseUser';
import { supabase } from '@/supabase';

useSupabaseUser(supabase);
</script>

<template>
  <RouterView />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: 'Clash Display', sans-serif;
}

a {
  color: black;
  text-decoration: none;
}
</style>

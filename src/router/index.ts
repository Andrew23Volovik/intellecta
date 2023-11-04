import { createRouter, createWebHistory } from 'vue-router';
import MclLanding from '@/views/MclLanding.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: MclLanding,
    },
  ],
});

export default router;

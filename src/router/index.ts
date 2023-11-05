import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: () => import('@/views/MclLanding.vue'),
    },
    {
      path: '/app',
      name: 'App',
      redirect: '/app/dashboard',
      component: () => import('@/components/MclApp.vue'),
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: () => import('@/views/MclDashboardView.vue'),
        },
        {
          path: 'conversation',
          name: 'Conversation',
          component: () => import('@/views/MclConversationView.vue'),
        },
        {
          path: 'image-generation',
          name: 'Image Generation',
          component: () => import('@/views/MclImageGenerationView.vue'),
        },
        {
          path: 'video-generation',
          name: 'Video Generation',
          component: () => import('@/views/MclVideoGenerationView.vue'),
        },
        {
          path: 'music-generation',
          name: 'Music Generation',
          component: () => import('@/views/MclMusicGenerationView.vue'),
        },
        {
          path: 'code-generation',
          name: 'Code Generation',
          component: () => import('@/views/MclCodeGenerationView.vue'),
        },
        {
          path: 'settings',
          name: 'Settings',
          component: () => import('@/views/MclSettingsView.vue'),
        },
      ],
    },
  ],
});

export default router;

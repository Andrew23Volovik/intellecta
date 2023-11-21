import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import { supabase } from '@/lib/supabase';

const removeHash = (to: RouteLocationNormalized, next: NavigationGuardNext): void => {
  if (to.hash.startsWith('#access_token')) return next({ ...to, hash: '' });
};

const authGuard = async (to: RouteLocationNormalized, next: NavigationGuardNext): Promise<void> => {
  if (to.meta.requiresAuth) {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return !session?.user ? next({ name: 'Auth' }) : next();
  }
  return next();
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: () => import('@/views/MclLandingView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/auth',
      name: 'Auth',
      component: () => import('@/views/MclAuthView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/app',
      name: 'App',
      redirect: '/app/dashboard',
      component: () => import('@/views/MclAppView.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: () => import('@/views/app/MclDashboardView.vue'),
        },
        {
          path: 'conversation',
          name: 'Conversation',
          component: () => import('@/views/app/MclConversationView.vue'),
        },
        {
          path: 'image',
          name: 'Image',
          component: () => import('@/views/app/MclImageGenerationView.vue'),
        },
        {
          path: 'video',
          name: 'Video',
          component: () => import('@/views/app/MclVideoGenerationView.vue'),
        },
        {
          path: 'music',
          name: 'Music',
          component: () => import('@/views/app/MclMusicGenerationView.vue'),
        },
        {
          path: 'code',
          name: 'Code',
          component: () => import('@/views/app/MclCodeGenerationView.vue'),
        },
        {
          path: 'settings',
          name: 'Settings',
          component: () => import('@/views/app/MclSettingsView.vue'),
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from, next): Promise<void> => {
  removeHash(to, next);
  await authGuard(to, next);
});

export default router;

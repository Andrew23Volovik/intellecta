import type { ComputedRef, Ref } from 'vue';
import { computed, onMounted, onUnmounted, ref } from 'vue';

interface IBreakpoints {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

const breakpoints: IBreakpoints = {
  sm: '(min-width: 320px) and (max-width: 640px)',
  md: '(min-width: 641px) and (max-width: 768px)',
  lg: '(min-width: 769px) and (max-width: 1024px)',
  xl: '(min-width: 1025px) and (max-width: 1280px)',
  '2xl': '(min-width: 1536px)',
};

interface IReturnBreakpoints {
  height: ComputedRef<number>;
  width: ComputedRef<number>;
  screenType: ComputedRef<'sm' | 'md' | 'lg' | 'xl' | '2xl'>;
}

export const useBreakpoints = (): IReturnBreakpoints => {
  const windowWidth: Ref<number> = ref(0);
  const windowHeight: Ref<number> = ref(0);
  const mediaQuery: Ref<string> = ref('');
  const onWidthChange = (): void => {
    windowWidth.value = window.innerWidth;
    windowHeight.value = window.innerHeight;

    for (const key in breakpoints) {
      const query: MediaQueryList = window.matchMedia(breakpoints[key as keyof typeof breakpoints]);
      if (query.matches) {
        mediaQuery.value = query.media;
      }
    }
  };

  const screenType: ComputedRef<'sm' | 'md' | 'lg' | 'xl' | '2xl'> = computed(() => {
    if (mediaQuery.value) {
      return Object.keys(breakpoints).find(
        (value) => breakpoints[value as keyof typeof breakpoints] === mediaQuery.value,
      ) as 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    }
    return '2xl';
  });

  const width: ComputedRef<number> = computed(() => windowWidth.value);
  const height: ComputedRef<number> = computed(() => windowHeight.value);

  onMounted(() => {
    windowWidth.value = window.innerWidth;
    windowHeight.value = window.innerHeight;

    onWidthChange();
    window.addEventListener('resize', onWidthChange);
  });

  onUnmounted(() => window.removeEventListener('resize', onWidthChange));

  return { width, height, screenType };
};

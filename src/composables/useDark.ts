import { onMounted, ref } from 'vue';

export const useDark = () => {
  const isDark = ref(false);
  const darkClassName = 'dark';
  const lightClassName = 'light';
  const themePreferenceKey = 'themePreference';

  const toggleTheme = (): void => {
    if (typeof window !== 'undefined') {
      const rootCls = document.documentElement.classList;
      isDark.value = !isDark.value;

      localStorage.setItem(themePreferenceKey, isDark.value ? 'dark' : 'light');

      if (isDark.value) {
        rootCls.remove(lightClassName);
        rootCls.add(darkClassName);
      } else {
        rootCls.remove(darkClassName);
        rootCls.add(lightClassName);
      }
    }
  };

  const applyTheme = () => {
    const rootCls = document.documentElement.classList;
    rootCls.toggle(darkClassName, isDark.value);
    rootCls.toggle(lightClassName, !isDark.value);
  };

  onMounted(() => {
    const storedTheme = localStorage.getItem(themePreferenceKey);
    if (storedTheme) {
      isDark.value = storedTheme === 'dark';
      applyTheme();
    }
  });

  return { isDark, toggleTheme };
};

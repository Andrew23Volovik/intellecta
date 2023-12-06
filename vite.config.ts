import { fileURLToPath, URL } from 'node:url';

import UnoCss from 'unocss/vite';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      vue({
        script: {
          defineModel: true,
        },
      }),
      UnoCss({
        configFile: './uno.config.ts',
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: true,
      proxy: {
        '/api': env.VITE_API_SERVER,
      },
    },
  };
});

// uno.config.ts
import { defineConfig, presetWebFonts, presetUno } from 'unocss';
export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
      provider: 'fontshare',
      fonts: {
        sans: 'Clash Display',
      },
    }),
  ],
});

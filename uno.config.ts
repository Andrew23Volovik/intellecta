// uno.config.ts
import { defineConfig, presetWebFonts, presetUno } from 'unocss';
export default defineConfig({
  shortcuts: {
    btn: 'relative flex justify-center items-center overflow-hidden rounded-lg font-400 text-base px-2 py-1 border-none shadow-sm cursor-pointer ease-in-out transition-500 sm:px-2 sm:py-1.5 md:px-5 md:py-2.5',
    input:
      'border-1 border-solid text-base outline-none focus:border-solid focus:border-1 rounded-lg px-2 py-1 w-full shadow-sm tracking-widest ease-in-out transition-500 sm:py-1.75 md:py-2.25',
  },
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

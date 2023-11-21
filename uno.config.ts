// uno.config.ts
import { defineConfig, presetWebFonts, presetUno, presetTypography } from 'unocss';
export default defineConfig({
  shortcuts: {
    btn: 'relative flex justify-center items-center overflow-hidden rounded-lg font-400 text-base px-2 py-1 border-none shadow-sm cursor-pointer ease-in-out transition-500 sm:px-2 sm:py-1.5 md:px-5 md:py-2.5',
    input:
      'border-1 border-solid text-base outline-none focus:border-solid focus:border-1 rounded-lg px-2 py-1 w-full shadow-sm tracking-widest ease-in-out transition-500 sm:py-1.75 md:py-2.25',
    card: 'w-full  rounded-lg shadow-md ease-in-out transition-500 p-4 xl:p-8',
    icon: 'h-6 w-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10',
  },
  presets: [
    presetUno(),
    presetWebFonts({
      provider: 'fontshare',
      fonts: {
        sans: 'Clash Display',
      },
    }),
    presetTypography({
      selectorName: 'markdown',
      cssExtend: {
        code: {
          color: '#d97706',
        },
        pre: {
          'border-width': '1px',
          'border-style': 'solid',
          'border-radius': '0.5rem',
          padding: 0,
          'letter-spacing': '0.05rem',
        },
        'html.light pre': {
          'border-color': '#d4d4d4',
        },
        'html.dark pre': {
          'border-color': '#525252',
        },
      },
    }),
  ],
});

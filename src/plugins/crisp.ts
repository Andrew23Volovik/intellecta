import type { Plugin } from 'vue';

declare global {
  interface Window {
    $crisp: any[];
    CRISP_WEBSITE_ID: string;
  }
}

export default {
  install: (): void => {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = '490aed77-ab78-42d2-ba64-fedb06bb8d17';

    (function (): void {
      const d: Document = document;
      const s: HTMLScriptElement = d.createElement('script');

      s.src = 'https://client.crisp.chat/l.js';
      s.async = true;
      d.getElementsByTagName('head')[0].appendChild(s);
    })();
  },
} satisfies Plugin;

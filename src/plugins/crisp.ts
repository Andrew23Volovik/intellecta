import type { Plugin } from 'vue';

export default {
  install: () => {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = '490aed77-ab78-42d2-ba64-fedb06bb8d17';

    (function () {
      const d = document;
      const s = d.createElement('script');

      s.src = 'https://client.crisp.chat/l.js';
      s.async = 1;
      d.getElementsByTagName('head')[0].appendChild(s);
    })();
  },
} satisfies Plugin;

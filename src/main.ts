import 'virtual:uno.css';
import '@/assets/main.scss';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginStorage from '@/plugins/piniaPluginStorage';

import App from './App.vue';
import router from './router';
import markdownit from '@/plugins/markdownit';

const app = createApp(App);

app.use(createPinia().use(piniaPluginStorage));
app.use(markdownit);
app.use(router);

app.mount('#app');

import 'virtual:uno.css';
import '@/assets/main.scss';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginStorage from '@/plugins/piniaPluginStorage';

import App from './App.vue';
import router from './router';
import markdownit from '@/plugins/markdownit';
import clickOutsideDirective from '@/plugins/clickOutsideDirective';
import crisp from '@/plugins/crisp';

const app = createApp(App);

app.use(crisp);
app.directive('click-outside', clickOutsideDirective);
app.use(createPinia().use(piniaPluginStorage));
app.use(markdownit);
app.use(router);

app.mount('#app');

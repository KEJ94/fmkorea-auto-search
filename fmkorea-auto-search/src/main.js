import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import axios from 'axios'

const app = createApp(App);

app.use(vuetify);
app.mount('#app');

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$eventBus = app;
loadFonts();
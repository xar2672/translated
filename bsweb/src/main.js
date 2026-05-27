import { createApp } from 'vue';
import App from './App.vue';
import 'leaflet/dist/leaflet.css';
import Buefy from 'buefy';
import './assets/styles/index.css';
import 'buefy/dist/buefy.css';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import { createI18n } from 'vue-i18n';
import { messages } from './plugins/i18n';
import { store } from './store/store.js';
import LoadScript from 'vue-plugin-load-script';
import UUID from 'vue-uuid';
import { Icon } from 'leaflet';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import Oruga from '@oruga-ui/oruga-next';
import router from './router';

// Leaflet fix for missing marker icons
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const saved_language = localStorage.getItem('preferred-language');
export const i18n = createI18n({ 
  locale: (saved_language != null) ? saved_language : navigator.language, // Dynamically sets initial language
  allowComposition: true,
  legacy: false,
  fallbackLocale: 'en', 
  returnObjects: true,
  useScope: 'global',
  messages 
});

const app = createApp(App)
 .use(UUID)
 .use(LoadScript)
 .use(i18n)
 .use(Buefy)
 .use(ToastPlugin)
 .use(Oruga)
 .use(store)
 .use(router)
 .mount('#app');
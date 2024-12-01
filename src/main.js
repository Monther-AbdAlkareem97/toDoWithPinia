import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import './assets/tailwind.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas)
const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon)
const pinia = createPinia();


import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';


const vuetify = createVuetify({

  components,
  directives,
});


app.use(vuetify);
app.use(router);
app.use(pinia);

app.mount('#app');

import App from './App.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faDownload, faPen, faTrash, faArrowLeft, faArrowRight, faArrowDown } from '@fortawesome/free-solid-svg-icons';

library.add(faDownload, faPen, faTrash, faArrowLeft, faArrowRight, faArrowDown);

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

app.component('FontAwesomeIcon', FontAwesomeIcon);

app.mount('#app');
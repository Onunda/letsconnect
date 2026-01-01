import { createApp } from 'vue'; // <-- Vue 3
import App from './App.vue';
import router from './router';
import '@/assets/css/main.css';

const app = createApp(App);

app.use(router);
app.mount('#app');

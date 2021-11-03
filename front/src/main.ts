import { createApp } from 'vue';
import App from './App.vue';
import './assets/index.css';
import { worker } from './worker';

worker.start();
createApp(App).mount('#app');

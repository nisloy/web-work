// import './assets/main.css'

import "@/assets/styles.scss";
import router from "./router";
import { createApp } from 'vue'
import App from './App.vue';
import ToastService from "primevue/toastservice";
import { createPinia } from "pinia";
const app = createApp(App);
app.use(ToastService);
app.use(router);
const pinia = createPinia();
app.use(pinia);

app.mount('#app')

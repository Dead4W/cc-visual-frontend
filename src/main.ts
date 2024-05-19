import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

import i18n from "./i18n";
app.use(i18n);

import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
app.use(Vue3Toastify, {
  autoClose: 5000,
} as ToastContainerOptions);

app.mount("#app");

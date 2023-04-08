import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import http from "./http";
import axios from 'axios';

const app = createApp(App);
app.use(router);
app.use(store);
app.use(ElementPlus);
app.config.globalProperties.$http = http;
app.mount('#app');

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
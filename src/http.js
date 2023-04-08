import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 3000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // 如果没有 token，请重定向到登录页面
      window.location.href = '/admin-login';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;

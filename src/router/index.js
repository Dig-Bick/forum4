import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import UserManagement from '@/views/UserManagement.vue'; // 引入用户管理页面组件
import AdminLogin from '@/views/AdminLogin.vue';
import AdminRegister from '@/views/AdminRegister.vue';
import Management from '@/views/Management.vue';

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView,
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  // },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  // 添加用户管理页面路由
  {
    path: '/user-management',
    name: 'UserManagement',
    component: UserManagement,
  },
  {
  path: '/admin-login',
  name: 'AdminLogin',
  component: AdminLogin,
},
{
  path: '/admin-register',
  name: 'AdminRegister',
  component: AdminRegister,
},
{
  path: '/management',
  name: 'Management',
  component: Management,
},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

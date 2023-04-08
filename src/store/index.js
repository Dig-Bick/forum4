import { createStore } from 'vuex';

export default createStore({
  state: {
    // 添加一个状态属性以存储用户令牌
    token: null,
  },
  getters: {
    // ...
  },
  mutations: {
    // 添加一个mutation以处理登录操作
    login(state, payload) {
      state.token = payload.token;
      localStorage.setItem('token', payload.token);
    },
    // ...
  },
  actions: {
    // ...
  },
  modules: {
    // ...
  },
});

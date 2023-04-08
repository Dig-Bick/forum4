<template>
  <div id="app">
    <el-menu mode="horizontal" default-active="1">
      <el-menu-item index="1">
        <router-link to="/login">登录</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/register">注册</router-link>
      </el-menu-item>
      <el-menu-item index="3" v-if="isAdmin">
        <router-link to="/user-management">用户管理</router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <router-link to="/admin-login">管理员登录</router-link>
      </el-menu-item>
      <el-menu-item index="5">
        <router-link to="/admin-register">管理员注册</router-link>
      </el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  computed: {
    // 检查用户是否是管理员
    isAdmin() {
      // 在这里添加您的实际逻辑，以下是一个示例：
      return (
        this.$store.state.user && this.$store.state.user.role === "admin"
      );
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
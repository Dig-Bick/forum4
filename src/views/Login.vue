<template>
  <div class="login">
    <h1>Login</h1>
    <el-form :model="loginForm" @submit.native.prevent="submitForm('loginForm')">
      <el-form-item label="Username" prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="loginForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">Login</el-button>
      </el-form-item>
    </el-form>
    <p>
      Don't have an account? <a @click="goToRegister">Register</a>
    </p>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    return {
      router,
    };
  },
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    submitForm() {
      this.$http
        .post("/api/login", this.loginForm)
        .then((response) => {
          if (response.status === 200) {
            // 存储 token 和角色信息到 localStorage
            localStorage.setItem("token", response.data.token);


            // 根据角色重定向到相应的页面

              this.router.push("/");

          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            this.$message.error(error.response.data.error);
          }
        });
    },
    goToRegister() {
      this.router.push("/register");
    },
  },
};
</script>

<style scoped>
.login {
  width: 300px;
  margin: 100px auto;
}
</style>

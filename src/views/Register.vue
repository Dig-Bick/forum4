<template>
  <div class="register">
    <el-form ref="registerForm" :model="registerForm" label-width="80px" @submit.native.prevent="submitForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="registerForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="registerForm.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="registerForm.confirmPassword"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="registerForm.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">注册</el-button>
        <el-button @click="goToLogin">登录</el-button>
      </el-form-item>
    </el-form>
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
      registerForm: {
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
      },
    };
  },
  methods: {
  submitForm() {
    if (this.registerForm.password !== this.registerForm.confirmPassword) {
      this.$message.error("两次输入的密码不一致");
      return;
    }
    this.$http
    .post("/api/register", this.registerForm)
      .then((response) => {
        if (response.status === 200) {
          this.$message.success(response.data);
          this.router.push("/login");
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          this.$message.error(error.response.data);
        }
      });
  },
  goToLogin() {
    this.router.push("/login");
  },
},
};
</script>

<style scoped>
.register {
  width: 300px;
  margin: 100px auto;
}
</style>

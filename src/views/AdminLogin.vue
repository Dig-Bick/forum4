<template>
  <div class="admin-login">
    <h1>管理员登录</h1>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="form.adminName" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">登录</el-button>
      </el-form-item>
    </el-form>
    <div class="register-link">
      <router-link to="/admin-register">没有账号？点击注册</router-link>
    </div>
    <div class="back">
      <el-button @click="$router.go(-1)">返回上一页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        adminName: "",
        password: "",
      },
    };
  },
  methods: {
    async submitForm() {
  try {
    const response = await this.$http.post("/admin/login", {
      adminName: this.form.adminName,
      password: this.form.password,
    });

    if (response.data.status === "success") {
      localStorage.setItem("jwt_token", response.data.token);
      this.$message({
        message: "登录成功",
        type: "success",
      });
      this.$router.push("/management");
    } else {
      this.$message({
        message: response.data.message,
        type: "error",
      });
    }
  } catch (error) {
    this.$message({
      message: "登录失败",
      type: "error",
    });
  }
},
  },
};
</script>

<style scoped>
.admin-login {
  max-width: 400px;
  margin: 0 auto;
}

.register-link {
  margin-top: 10px;
  text-align: center;
}

.back {
  margin-top: 10px;
  text-align: center;
}
</style>

<template>
  <div class="admin-register">
    <h1>管理员注册</h1>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="form.adminName" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">注册</el-button>
      </el-form-item>
    </el-form>
    <div class="login-link">
      <router-link to="/admin-login">已有账号？点击登录</router-link>
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
        email: "",
},
};
},
methods: {
async submitForm() {
try {
await this.$http.post("/admin/register", this.form);
this.$message.success("注册成功，请登录");
this.$router.push("/admin-login");
} catch (error) {
console.error(error);
this.$message.error("注册失败，请检查输入");
}
},
},
};
</script>

<style scoped>
.admin-register {
  max-width: 400px;
  margin: 0 auto;
}

.login-link {
  margin-top: 10px;
  text-align: center;
}

.back {
  margin-top: 10px;
  text-align: center;
}
</style>
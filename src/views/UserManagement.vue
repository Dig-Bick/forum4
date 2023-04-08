<template>
  <div class="user-management">
    <h1>User Management</h1>
    <el-table :data="users" style="width: 100%">
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="username" label="Username" width="180"></el-table-column>
      <el-table-column prop="password" label="Password"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑用户" :visible.sync="dialogVisible">
      <el-form :model="form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import http from "../http";

export default {
  data() {
    return {
      users: [],
      dialogVisible: false,
      form: {
        id: null,
        username: "",
        password: "",
      },
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      const { data } = await http.get("/api/user-management");
      this.users = data;
    },
    handleEdit(index, row) {
      this.form = { ...row };
      this.dialogVisible = true;
    },
    async handleDelete(index, row) {
      await http.delete(`/api/user-management/${row.id}`);
      this.users.splice(index, 1);
    },
    async saveUser() {
      const { id } = this.form;
      if (id) {
        await http.put(`/api/user-management/${id}`, this.form);
        const index = this.users.findIndex((user) => user.id === id);
        this.users[index] = { ...this.form };
      } else {
        const { data } = await http.post("/api/user-management", this.form);
        this.users.push(data);
      }
      this.dialogVisible = false;
    },
  },
};
</script>

<style scoped>
.user-management {
  width: 80%;
  margin: 0 auto;
}
</style>

<template>
  <div class="user-management">
    <h1>用户管理</h1>
    <div class="search">
      <el-input
        v-model="searchQuery"
        placeholder="搜索用户"
        @input="searchUsers"
      ></el-input>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="primary" @click="handleEdit(row)">编辑</el-button>
          <el-button type="primary" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <div class="back">
      <el-button @click="$router.go(-1)">返回上一页</el-button>
    </div>

    <el-dialog
      title="编辑用户"
      :visible.sync="editDialogVisible"
      width="30%"
      @close="cancelEdit"
    >
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      editDialogVisible: false,
      editForm: {},
      searchQuery: "",
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await this.$http.get("/user/list", {
          params: {
            page: this.currentPage - 1,
            size: this.pageSize,
            search: this.searchQuery,
          },
        });
        this.tableData = response.data.content;
        this.total = response.data.totalElements;
      } catch (error) {
        console.error(error);
        this.$message.error("获取用户列表失败");
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    },
    handleEdit(row) {
      console.log('Edit button clicked');
console.log("Handle edit:", row);
this.openEditDialog(row);
},
openEditDialog(row) {
console.log('Opening edit dialog');
this.editForm = JSON.parse(JSON.stringify(row));
this.editDialogVisible = true;
console.log('editDialogVisible:', this.editDialogVisible); // 新增这一行
},
async submitEdit() {
// 提交编辑逻辑
try {
await this.$http.put(`/user/update/${this.editForm.id}`, this.editForm);
this.$message.success("用户更新成功");
await this.fetchData();
this.editDialogVisible = false;
} catch (error) {
console.error(error);
this.$message.error("用户更新失败");
}
},
cancelEdit() {
this.editDialogVisible = false;
},
async handleDelete(row) {
// 删除用户逻辑
try {
await this.$http.delete(`/user/delete/${row.id}`);
this.$message.success("用户删除成功");
await this.fetchData();
} catch (error) {
console.error(error);
this.$message.error("用户删除失败");
}
},
searchUsers() {
this.fetchData();
},
},
};
</script>

<style scoped>
.user-management {
  max-width: 800px;
  margin: 0 auto;
}

.pagination {
  margin-top: 20px;
}

.back {
  margin-top: 10px;
  text-align: center;
}

.search {
  margin-bottom: 20px;
}
</style>

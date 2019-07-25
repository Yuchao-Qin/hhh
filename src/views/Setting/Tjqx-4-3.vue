<template>
  <!-- 工作日志 -->
  <div class="page">
    <!-- 面包屑 -->
    <Breadcrumb :crumData="crumData"></Breadcrumb>
    <!-- 账户管理 -->
    <div class="tableContainer">
      <div :gutter="3" class="tableTitle">
        <span :span="8">
          <el-button size="mini" type="primary" @click="addPower">+ 添加权限管理
          </el-button>
        </span>
      </div>
      <el-table size="mini" max-height="530" :data="tableData" border stripe
        style="width: 100%">
        <el-table-column prop="permissions_name" label="权限名">
        </el-table-column>
        <el-table-column prop="controllers" label="操作控制器">
        </el-table-column>
        <el-table-column label="操作控制器">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="delet"
              @click="delet(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog width="30%" title="新增用户"
        :visible.sync="permissionsManageVisible">
        <el-form status-icon label-width="100px" class="demo-ruleForm">
          <el-form-item class="jueseName" label="权限名" size="mini">
            <el-input v-model="permissions_name" size="small"
              autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item class="jueseName" label="操作控制器" size="mini">
            <el-input v-model="controllers" size="small" autocomplete="off">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="permissionsManageVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm()">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 分页 -->
      <!-- <el-pagination class="pagination" background layout="prev, pager, next"
        :pager-count='17' :total="1000">
      </el-pagination> -->
    </div>
  </div>
</template>
<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
export default {
  data() {
    return {
      permissionsManageVisible: false,
      controllers: '',
      permissions_name: '',
      crumData: {
        breadItem: [{ name: '设置' }, { name: '权限管理' }],
        leadingIn: false,
        leadingOut: false
      },
      tableData: [],
      value1: '',
      value2: '',
      searchValue: ''
    }
  },
  methods: {
    newAccount() {},
    addPower() {
      this.permissionsManageVisible = true
      this.controllers = ''
      this.permissions_name = ''
    },
    delet(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.DELETFUN(row)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    DELETFUN(row) {
      this.$http.delete(`/auth/permission/${row.id}`).then(res => {
        if (res.code == 200) {
          this.tableListData()
          this.$message({
            type: 'success',
            message: res.message
          })
        }
      })
    },
    confirm() {
      this.$http({
        method: 'post',
        url: '/auth/permissions',
        params: {
          controllers: this.controllers,
          permissions_name: this.permissions_name
        }
      }).then(res => {
        if (res.code == 200) {
          this.permissionsManageVisible = false
          this.tableListData()
          this.$message({
            type: 'success',
            message: res.message
          })
        }
      })
    },
    tableListData() {
      this.$http.get('/auth/permissions/lists').then(res => {
        if (res.code == 200) {
          this.tableData = res.data
        }
      })
    }
  },
  mounted() {
    this.tableListData()
  },
  components: {
    Breadcrumb
  }
}
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.headGroup {
  padding-top: 20px;
  text-align: left;
}

.tableContainer {
  text-align: left;
  padding: 0 15px;
  .tableTitle {
    display: flex;
    padding: 10px 0;
  }
}

.tableName {
  font-weight: bold;
  align-self: flex-end;
  text-align: left;
}
.addAccount {
  text-align: left;
}
.delet {
  color: red;
}

.searchInput {
  width: 80%;
}

.calendar {
  width: 90%;
}
</style>
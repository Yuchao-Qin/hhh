<template>
  <!-- 工作日志 -->
  <div class="page">
    <!-- 面包屑 -->
    <Breadcrumb :crumData="crumData"></Breadcrumb>
    <!-- 账户管理 -->
    <div class="tableContainer">
      <div :gutter="3" class="tableTitle">
        <span  class="titleName fl">{{`角色名字：${juese_name}`}}</span>
        <span class="fr" :span="8">
          <el-button  size="small" type="primary"
            @click="addDialogFormVisible = true">+ 添加权限</el-button>
        </span>
      </div>
      <el-table size="mini" max-height="700" :data="tableData" border stripe
        style="width: 100%">
        <el-table-column prop="permissions_name" label="权限名字">
        </el-table-column>
        <el-table-column prop="operating" label="CURD权限">
          <template slot-scope="scope">
            <el-checkbox true-label="1" false-label="0"
              v-model="scope.row.is_delete" disabled>删</el-checkbox>
            <el-checkbox true-label="1" false-label="0"
              v-model="scope.row.is_post" disabled>增</el-checkbox>
            <el-checkbox true-label="1" false-label="0"
              v-model="scope.row.is_put" disabled>改</el-checkbox>
            <el-checkbox true-label="1" false-label="0"
              v-model="scope.row.is_read" disabled>查</el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="delet"
              @click="Tabledelet(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 增加 -->
      <el-dialog width="30%" title="新增用户" :visible.sync="addDialogFormVisible">
        <el-form status-icon label-width="100px" class="editPermissions">
          <el-form-item label="角色名字">
            <el-input class="juese_name" v-model="juese_name" width="100"
              size="mini" autocomplete="off" disabled>
            </el-input>
          </el-form-item>
          <el-form-item label="添加权限">
            <el-select v-model="permissions.permissions_id" size="mini"
              autocomplete="off">
              <el-option v-for="(item ,index) in permissionsList"
                :label="item.permissions_name" :value="item.id" :key="index">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="CURD权限">
            <el-checkbox true-label="1" false-label="0"
              v-model="permissions.is_delete">删</el-checkbox>
            <el-checkbox true-label="1" false-label="0"
              v-model="permissions.is_post">增</el-checkbox>
            <el-checkbox true-label="1" false-label="0"
              v-model="permissions.is_put">改</el-checkbox>
            <el-checkbox true-label="1" false-label="0"
              v-model="permissions.is_read">查</el-checkbox>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm('ruleForm')">确 定</el-button>
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
      loading: true,
      permissionsList: '',
      addDialogFormVisible: false,
      permissions: {
        role_id: this.$route.params.id,
        permissions_id: '',
        is_read: '0',
        is_post: '0',
        is_delete: '0',
        is_put: '0'
      },
      addpermissionsData: {},
      crumData: {
        breadItem: [
          { name: '设置' },
          { name: '角色管理', bits: 'Zhqx-4-1', params: { radio2: '角色管理' } },
          { name: '权限分配' }
        ],
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
    confirm() {
      this.$http({
        method: 'post',
        url: '/auth/node',
        params: this.permissions
      }).then(res => {
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.addDialogFormVisible = false
          this.initData()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    initData() {
      // this.$startLoading()
      this.$http
        .all([
          this.$http.get(`/auth/role/permissionsList/${this.$route.params.id}`),
          this.$http.get('/auth/permissions/lists')
        ])
        .then(
          this.$http.spread((res1, res2) => {
            if (res1.code == 200 && res2.code == 200) {
              this.tableData = res1.data
              this.permissionsList = res2.data
              // this.$endLoading()
            }else {
              this.$message.error('出错啦')
            }

            
          })
        )
    },
    Tabledelet(row) {
      this.$http({
        method: 'DELETE',
        url: `/auth/role/node`,
        params: {
          role_id: row.role_id,
          permissions_id: row.permissions_id
        }
      }).then(res => {
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.initData()
        } else {
          this.$message.error(res.message)
        }
      })
    }
  },
  computed: {
    juese_name() {
      return this.$route.params.name
    }
  },
  watch: {
    $route(to, from) {
      console.log(to, from)
      this.permissions.permissions_id = this.$route.params.id
    }
  },
  mounted() {
    this.initData()
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

.titleName {
  font-weight: bold;
  font-size: 14px;
  line-height: 28px;
}
</style>

<style>
.editPermissions .juese_name .el-input__inner {
  border: none;
  max-width: 193px;
}
</style>



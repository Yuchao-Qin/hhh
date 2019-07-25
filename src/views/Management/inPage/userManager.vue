<template>
  <div class="page">
    <!-- 面包屑 -->
    <Breadcrumb :crumData="crumData"></Breadcrumb>
    <!-- tab -->
    <h3 class="title">商家绑定用户管理</h3>
    <!-- 账户管理 -->
    <div class="tableContainer">
      <div :gutter="5" class="tableTitle">
        <span class="tableName fl" :span="20">
          <span>商家ID：{{account}}</span><span>商家名称：{{ shop_name }}</span></span>
        <span class="addAccount fr" :span="4">
          <el-button size="mini" type="primary" @click="addIDBtn">+
            添加用户ID</el-button>
        </span>
      </div>
      <el-table size="mini" max-height="550" :data="tableData" border stripe
        style="width: 100%">
        <el-table-column type="index" label="编号" width="50">
        </el-table-column>
        <el-table-column prop="account" label="用户ID">
        </el-table-column>
        <el-table-column prop="phoneNumber" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="delet"
              @click="deleteFun(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加ID模态框 -->
      <el-dialog width="30%" title="添加用户ID" :visible.sync="dialogIDVisible">
        <template v-if="dialogIDVisible">
          <el-form :model="ruleForm" status-icon ref="ruleForm" :rules="rule"
            label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户ID" prop="account">
              <el-input v-model="ruleForm.user_id" size="small"
                autocomplete="off" placeholder="添加用户ID">
              </el-input>
            </el-form-item>
          </el-form>
        </template>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogIDVisible = false">取 消</el-button>
          <el-button type="primary" @click="addIDconfirm('ruleForm')">确 定
          </el-button>
        </div>
      </el-dialog>
      <!-- 编辑模态框 -->
      <el-dialog width="30%" title="编辑用户ID" :visible.sync="dialogEditIDVisible">
        <el-form :model="ruleForm" status-icon ref="ruleForm"
          label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户ID">
            <el-input v-model="ruleForm.account" size="small" autocomplete="off"
              placeholder="编辑用户ID">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogEditIDVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm('ruleForm')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 分页 -->
      <el-pagination class="pagination" background layout="prev, pager, next"
        :pager-count='17' :total="1000">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
import DatePicker from '@/components/DatePicker.vue'
export default {
  data() {
    return {
      id: this.$route.params.id,
      account: this.$route.params.account,
      shop_name: this.$route.params.name,
      radio1: '账户管理',
      overView: [],
      management: [],
      content: [],
      setting: [],
      jueSeName: '',
      dialogIDVisible: false,
      dialogEditIDVisible: false,
      ruleForm: { user_id: '' },
      rule: { user_id: [{ required: true, message: '内容不可为空', trigger: 'blur' }] },
      crumData: {
        breadItem: [{ name: '管理' }, { name: '商家管理', bits: 'Sjgl-2-2' }, { name: '账户管理' }],
        leadingIn: false,
        leadingOut: false
      },
      tableData: []
    }
  },
  watch: {},
  methods: {
    // 添加ID 按钮
    addIDBtn() {
      this.dialogIDVisible = true
      this.ruleForm.user_id = ''
    },
    // 添加ID表单提交
    addIDconfirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http({ method: 'post', url: `/business/bind/${this.id}`, params: { ...this.ruleForm } }).then(res => {
            if (res.code == 200) {
              this.dialogIDVisible = false
              this.initPage()
            } else {
              this.$message.error(res.message)
              this.dialogIDVisible = true
            }
          })
        }
      })
    },
    // 删除按钮
    deleteFun(row) {
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
      this.$http({
        method: 'post',
        url: `/business/relieve${'/' + row.id}`
      }).then(res => {
        if (res.coed == 200) {
          this.initPage(row)
          this.$message({type:'success',message:res.message})
        } else {
          this.$message.error(res.message)
        }
      })
    },
    TableListAPI() {
      this.$http({
        method: 'get',
        url: `/business/bindList${'/' + this.id}`
      }).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.list
        }
      })
    },
    async initPage() {
      await this.TableListAPI()
    },
    edit() {}
  },
  mounted() {
    this.initPage()
  },
  components: {
    Breadcrumb,
    DatePicker
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
  padding: 0 15px;
}

.tableContainer {
  padding: 0 15px;
  .tableTitle {
    padding: 10px;
  }
}

.tableName {
  font-weight: bold;
  align-self: flex-end;
  text-align: left;
  span {
    margin-right: 20px;
  }
}
.addAccount {
  text-align: left;
}
.delet {
  color: red;
}

.el-select {
  width: 100%;
}

.el-checkbox-group {
  text-align: left;
}

.jueseName {
  width: 40%;
  text-align: left;
}

h3 {
  margin: 10px 0;
}
</style>
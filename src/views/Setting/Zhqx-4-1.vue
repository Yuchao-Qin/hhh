<template>
  <div class="page">
    <!-- 面包屑 -->

    <Breadcrumb :crumData="crumData"></Breadcrumb>
    <!-- tab -->
    <div class="headGroup">
      <el-radio-group v-model="radio1" size="small">
        <el-radio-button label="账户管理"></el-radio-button>
        <el-radio-button label="角色管理"></el-radio-button>
      </el-radio-group>
    </div>
    <!-- 账户管理 -->
    <div v-show="radio1 === '账户管理'" class="tableContainer">
      <el-row :gutter="5" class="tableTitle">
        <el-col class="tableName" :span="20"><span>账户列表</span></el-col>
        <el-col class="addAccount" :span="4">
          <el-button size="small" type="primary"
            @click="dialogFormVisible = true">+
            新增管理员</el-button>
        </el-col>
      </el-row>
      <el-table size="small" :data="tableData" border stripe max-height="550"
        style="width: 100%">
        <el-table-column prop="admin_account_number" label="账号">
        </el-table-column>
        <el-table-column prop="role_name" label="角色">
        </el-table-column>
        <el-table-column prop="admin_name" label="姓名">
        </el-table-column>
        <el-table-column prop="admin_phone" label="手机号">
        </el-table-column>
        <!-- <el-table-column prop="staus" label="状态">
        </el-table-column> -->
        <el-table-column prop="operating" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="delet"
              @click="accountListDelet(scope.row)">删除</el-button>
            <el-button type="text" size="small"
              @click="zhuanghu_manage_edit = true">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 新增用户模态 -->
      <el-dialog width="30%" title="新增管理员" :visible.sync="dialogFormVisible">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"
          label-width="100px" class="demo-ruleForm">
          <el-form-item label="账号" prop="account">
            <el-input v-model="ruleForm.account" size="small"
              autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" size="small" v-model="ruleForm.pass"
              autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" size="small" v-model="ruleForm.checkPass"
              autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="personName">
            <el-input size="small" v-model="ruleForm.personName"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phoneNumber">
            <el-input size="small" v-model="ruleForm.phoneNumber"
              autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="账户角色" size="small" prop="region">
            <el-select v-model="ruleForm.region" autocomplete="off"
              placeholder="请选择角色">
              <el-option v-for="(item ,index) in JueseSelectData"
                :label="item.role_name" :value="item.id" :key="index">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="
          confirm('ruleForm')">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog width="30%" title="修改" :visible.sync="zhuanghu_manage_edit">
        <el-form :model="zhanghu_manage_from" status-icon
          ref="zhuanghu_manage_from" label-width="100px" class="demo-ruleForm">
          <!-- <el-form-item label="状态" >
            <el-input v-model="zhanghu_manage_from.account" size="small" autocomplete="off"></el-input>
          </el-form-item> -->
          <el-form-item label="姓名">
            <el-input type="personName" size="small"
              v-model="zhanghu_manage_from.personName" autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input type="phoneNumber" size="small"
              v-model="zhanghu_manage_from.phoneNumber" autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item label="角色" size="small">
            <el-select v-model="zhanghu_manage_from.region" autocomplete="off"
              placeholder="请选择角色">
              <el-option label="管理员" value="manager"></el-option>
              <el-option label="产品部" value="producter"></el-option>
              <el-option label="市场部" value="market"></el-option>
              <el-option label="运营部" value="yunYing"></el-option>
              <el-option label="开发部" value="dever"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="zhuanghu_manage_edit = false">取 消</el-button>
          <el-button type="primary" @click="confirm('ruleForm')">确 定
          </el-button>
        </div>
      </el-dialog>
      <!-- 分页 -->
      <el-pagination class="pagination" background layout="prev, pager, next"
        :pager-count='17' :total="1000">
      </el-pagination>
    </div>
    <!-- 权限管理修改页 -->
    <div v-show="radio1 === '角色管理'" class="tableContainer">
      <el-row :gutter="5" class="tableTitle">
        <el-col class="tableName" :span="16"><span>角色列表</span></el-col>
        <el-col class="addAccount" :span="8">
          <el-button size="small" type="primary"
            @click="dialogTableVisible = true">+
            新增角色</el-button>
        </el-col>
      </el-row>
      <el-table :data="JueseTableData" border stripe style="width: 100%">
        <el-table-column prop="role_name" label="角色">
        </el-table-column>
        <el-table-column prop="permissions_name" label="所拥有权限">
        </el-table-column>
        <el-table-column prop="operating" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="delet">删除</el-button>
            <el-button type="text" size="small" @click="powerVisible = true">
              修改
            </el-button>
            <el-button type="text" size="small"
              @click="permissionsHandel(scope.$index, scope.row)">权限分配
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 修改模态 -->
      <el-dialog width="30%" title="修改" :visible.sync="powerVisible">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"
          label-width="100px" class="demo-ruleForm">
          <el-form-item label="角色" size="small">
            <el-select v-model="zhanghu_manage_from.region" autocomplete="off"
              placeholder="请选择角色">
              <el-option label="管理员" value="manager"></el-option>
              <el-option label="产品部" value="producter"></el-option>
              <el-option label="市场部" value="market"></el-option>
              <el-option label="运营部" value="yunYing"></el-option>
              <el-option label="开发部" value="dever"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="概况" prop="type">
            <el-input label="所拥有权限" v-model="owenPower"></el-input>
          </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="powerVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm('ruleForm')">确 定
          </el-button>
        </div>
      </el-dialog>
      <!-- 模态 -->
      <el-dialog width="50%" title="新增角色" :visible.sync="dialogTableVisible">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"
          label-width="100px" class="demo-ruleForm">
          <el-form-item class="jueseName" label="角色名称">
            <el-input v-model="jueSeName" size="small" autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item label="概况" prop="type">
            <el-checkbox-group v-model="overView">
              <el-checkbox label="查看整体数据"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="管理" prop="type">
            <el-checkbox-group v-model="management">
              <el-checkbox label="查看用户管理"></el-checkbox>
              <el-checkbox label="查看商家管理"></el-checkbox>
              <el-checkbox label="查看卡券管理"></el-checkbox>
              <el-checkbox label="查看消息管理"></el-checkbox>
              <el-checkbox label="查看用户管理"></el-checkbox>
              <el-checkbox label="查看用户管理"></el-checkbox>
              <el-checkbox label="查看用户管理"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="内容" prop="type">
            <el-checkbox-group v-model="content">
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="设置" prop="type">
            <el-checkbox-group v-model="setting">
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm('ruleForm')">确 定
          </el-button>
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
export default {
  data() {
    var validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'))
      } else if (!/^[a-zA-Z0-9]{6,18}$/.test(value)) {
        callback(new Error('请输入6~18位可由字母或数字组成的账号'))
      } else {
        // if (this.ruleForm.account !== '') {
        //   this.$refs.ruleForm.validateField('account')
        // }
        console.log(callback())
      }
    }

    var validatepersonName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入姓名'))
      } else {
        // console.log(this.$ref.ruleForm,111)
        // if (this.ruleForm.personName !== '') {
        //   this.$ref.ruleForm.validateField('personName')
        // }
        callback()
      }
    }
    var validatephoneNumber = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(value)) {
        callback(new Error('请输入正确手机号'))
      } else {
        callback()
      }
    }

    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!/^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,})$/.test(value)) {
        callback(new Error('请输入至少字母和数字共同组成的8位密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }

    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      powerVisible: false,
      jueseSelectList: [],
      owenPower: '',
      radio1: '账户管理',
      zhuanghu_manage_edit: false,
      overView: [],
      management: [],
      content: [],
      setting: [],
      jueSeName: '',
      crumData: {
        breadItem: [{ name: '设置' }, { name: '工作日志' }],
        leadingIn: false,
        leadingOut: false
      },
      tableData: [],
      JueseTableData: [],
      JueseSelectData: [],
      dialogFormVisible: false,
      dialogTableVisible: false,
      ruleForm: {
        pass: '',
        checkPass: '',
        account: '',
        phoneNumber: '',
        personName: '',
        region: ''
      },
      zhanghu_manage_from: {
        pass: '',
        checkPass: '',
        account: '',
        region: '',
        personName: '',
        phoneNumber: ''
      },
      rules: {
        account: [{ required: true, validator: validateAccount, trigger: 'blur' }],
        pass: [{ required: true, validator: validatePass, trigger: 'blur' }],
        checkPass: [{ required: true, validator: validatePass2, trigger: 'blur' }],
        region: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
        personName: [
          { type: 'string', required: true, validator: validatepersonName, message: '请填写姓名', trigger: 'blur' }
        ],
        phoneNumber: [
          { type: 'string', required: true, validator: validatephoneNumber, message: '填写手机号', trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px'
    }
  },
  watch: {
    radio1(newValue) {
      this.crumData.breadItem.splice(this.crumData.breadItem.length - 1, 1, { name: newValue })
    }
  },
  mounted() {
    this.initData()
    // 有关tab项
    try {
      console.log(this.$route.params.radio2)
      if (this.$route.params.radio2) {
        this.radio1 = this.$route.params.radio2
      }
    } catch (error) {
      console.log('error')
    }
  },
  methods: {
    initData() {
      this.$http({
        method: 'get',
        url: '/auth/roleList'
      }).then(res => {
        this.JueseTableData = res.data.data
      })
      this.$http({
        method: 'get',
        url: '/re/accNumber'
      }).then(res => {
        if (res.code == 200) {
          console.log(res)
          this.tableData = res.data.list.data
        }
      })
      // 角色  不分页
      this.$http({
        method: 'get',
        url: '/re/getRole'
      }).then(res => {
        if (res.code == 200) {
          console.log(res)
          this.JueseSelectData = res.data.role
        }
      })
    },
    accountListDelet(row) {
      this.$http({
        method: 'DELETE',
        url: `/re/${row.id}`
      }).then(res => {
        this.$message(res.message)
      })
    },
    confirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http({
            method: 'post',
            url: '/re/register',
            params: {
              admin_account_number: this.ruleForm.account,
              password: this.ruleForm.pass,
              confirm_password: this.ruleForm.checkPass,
              admin_name: this.ruleForm.personName,
              admin_phone: this.ruleForm.phoneNumber,
              role_id: this.ruleForm.region,
              confirm_password: this.ruleForm.checkPass
            }
          }).then(res => {
            if (res.code == 200) {
              this.dialogFormVisible = false
              this.initData()
              this.$message({ message: res.message, type: 'success' })
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          console.log('error submit!!')
          this.dialogFormVisible = true
          return false
        }
      })
    },
    // 权限分配按钮
    permissionsHandel(index, row) {
      console.log(index, row)
      this.$router.push({ name: 'permissions', params: { id: row.id, name: row.role_name } })
    }
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
}

.tableContainer {
  padding: 0 15px;
  .tableTitle {
    display: flex;
    padding: 10px;
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

// .pagination {
//   position: absolute;
//   bottom: 75px;
//   left: calc(50% - 505px);
// }

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
</style>


<style lang="scss">
</style>




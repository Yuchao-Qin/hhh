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
            <el-button type="text" size="small" @click="manage_edit(scope.row)">
              修改</el-button>
            <!--  -->
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
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"
          label-width="100px" class="demo-ruleForm">
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
          <el-button @click="zhuanghu_manage_edit = false">取 消</el-button>
          <el-button type="primary" @click="manage_edit_confirm('ruleForm')">确 定
          </el-button>
        </div>
      </el-dialog>
      <!-- 分页 -->
      <el-pagination v-if="total>10" @current-change="handleCurrentChange1"
        :current-page.sync="currentPage1" class="pagination" background
        layout="prev, pager, next" :total="total">
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
      <el-table size="mini" :data="JueseTableData" border stripe
        style="width: 100%">
        <el-table-column prop="role_name" label="角色">
        </el-table-column>
        <el-table-column prop="permissions_name" label="所拥有权限">
        </el-table-column>
        <el-table-column prop="operating" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="delet"
              @click="Juesedelet(scope.row)">删除</el-button>
            <el-button type="text" size="small" @click="JueseEdit(scope.row)">
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
            <el-input v-model="role_name" size="small" autocomplete="off">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <!-- <template slot-scope="scope"> -->
          <el-button @click="powerVisible = false">取 消</el-button>
          <el-button type="primary" @click="JueseRevise()">确 定
          </el-button>
          <!-- </template> -->
        </div>
      </el-dialog>
      <!-- 新增角色模态 -->
      <el-dialog width="30%" title="新增角色" :visible.sync="dialogTableVisible">
        <el-form status-icon label-width="100px" class="demo-ruleForm">
          <el-form-item class="jueseName" label="角色名称">
            <el-input v-model="role_name" size="small" autocomplete="off">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="JueseConfirm">确 定
          </el-button>
        </div>
      </el-dialog>
      <!-- 分页 -->
      <el-pagination v-if="total2>10" @current-change="handleCurrentChange2"
        :current-page.sync="currentPage2" class="pagination" background
        layout="prev, pager, next" :total="total2">
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
        callback()
      }
    }

    var validatepersonName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入姓名'))
      } else {
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
      userId: '',
      jueseId: '',
      currentPage1: 1,
      currentPage2: 1,
      powerVisible: false,
      // last_page1: '',
      // last_page2: '',
      total: 0,
      total2: 0,
      jueseSelectList: [],
      owenPower: '',
      radio1: '账户管理',
      zhuanghu_manage_edit: false,
      role_name: '',
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
      // 角色 分页
      this.$http({
        method: 'get',
        url: '/auth/roleList',
        params: {
          page: this.currentPage2
        }
      }).then(res => {
        this.total2 = res.data.total
        // this.last_page2 = res.data.last_page
        this.JueseTableData = res.data.data
      })
      this.$http({
        method: 'get',
        url: '/re/accNumber',
        params: {
          page: this.currentPage1
        }
      }).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.list.data
          this.total = res.data.list.total * 1
          // this.last_page1 = res.data.list.last_page
          console.log(this.total)
        } else {
          this.$message.error(res.message)
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
        } else {
          this.$message.error(res.message)
        }
      })
    },
    accountListDelet(row) {
      this.$http({
        method: 'DELETE',
        url: `/re/${row.id}`
      }).then(res => {
        if (res.code == 200) {
          this.$message({ message: res.message, type: 'success' })
          this.$http({
            method: 'get',
            url: '/re/accNumber',
            params: {
              page: this.currentPage1
            }
          }).then(res => {
            if (res.code == 200) {
              this.tableData = res.data.list.data
              this.total = res.data.list.total * 1
              if (res.data.list.data.length == 0) {
                this.currentPage1 -= 1
                // this.last_page1 -= 1;
                this.initData()
              }
              // this.last_page1 = res.data.list.last_page
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          this.$message.error(res.message)
        }
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

              // this.currentPage1 = this.last_page1
              this.initData()

              // this.currentPage1 = 1
              this.$message({ message: res.message, type: 'success' })
              this.$refs[formName].resetFields()
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
    JueseConfirm() {
      this.$http
        .post('/auth/role', {
          role_name: this.role_name
        })
        .then(res => {
          if (res.code == 200) {
            this.$message({ message: res.message, type: 'success' })
            // this.currentPage2 = this.last_page2
            this.dialogTableVisible = false
            this.role_name = ''
            this.initData()
          } else {
            this.$message.error(res.message)
          }
        })
    },
    // 权限分配按钮
    permissionsHandel(index, row) {
      console.log(index, row)
      this.$router.push({ name: 'permissions', params: { id: row.id, name: row.role_name } })
    },
    manage_edit(row) {
      this.zhuanghu_manage_edit = true
      this.userId = row.id
    },
    manage_edit_confirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http({
            url: '/re/accUpdate',
            method: 'PUT',
            params: {
              user_id: this.userId,
              password: this.ruleForm.pass,
              confirm_password: this.ruleForm.checkPass,
              admin_name: this.ruleForm.personName,
              admin_phone: this.ruleForm.phoneNumber,
              role_id: this.ruleForm.region,
              confirm_password: this.ruleForm.checkPass
            }
          }).then(res => {
            if (res.code == 200) {
              this.$message({ type: 'success', message: res.message })
              this.zhuanghu_manage_edit = false
              this.$refs[formName].resetFields()
              this.$http({
                method: 'get',
                url: '/re/accNumber',
                params: {
                  page: this.currentPage1
                }
              }).then(res => {
                if (res.code == 200) {
                  this.tableData = res.data.list.data
                  // this.last_page1 = res.data.list.last_page
                } else {
                  this.$message.error(res.message)
                }
              })
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          console.log('error submit!!')
          this.zhuanghu_manage_edit = true
          return false
        }
      })
    },
    handleCurrentChange1(val) {
      this.$http({
        method: 'get',
        url: '/re/accNumber',
        params: {
          page: val
        }
      }).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.list.data
          // this.last_page1 = res.data.list.last_page
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleCurrentChange2(val) {
      this.$http({
        method: 'get',
        url: '/auth/roleList',
        params: {
          page: val
        }
      }).then(res => {
        this.JueseTableData = res.data.data
        // this.last_page2 = res.data.last_page
      })
    },
    Juesedelet(row) {
      this.$http.delete(`/auth/role/${row.id}`).then(res => {
        this.$http({
          method: 'get',
          url: '/auth/roleList',
          params: {
            page: this.currentPage2
          }
        }).then(res => {
          this.total2 = res.total
          this.JueseTableData = res.data.data
          if (res.data.data.length == 0) {
            this.currentPage2 -= 1
            // this.last_page1 -= 1;
            this.initData()
          }
        })
      })
    },
    JueseRevise() {
      this.$http.put(`/auth/role/${this.jueseId}`, { role_name: this.role_name }).then(res => {
        this.$http.get('/auth/roleList', { params: { page: this.currentPage2 } }).then(res => {
          if (res.code == 200) {
            this.JueseTableData = res.data.data
            // this.last_page2 = res.data.last_page
            this.powerVisible = false
            this.role_name = ''
          } else {
            this.$message.error(res.message)
          }
        })
      })
    },
    JueseEdit(row) {
      this.powerVisible = true
      this.jueseId = row.id
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
  min-width: 300px;
  text-align: left;
}
</style>


<style lang="scss">
</style>




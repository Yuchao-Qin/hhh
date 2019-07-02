<template>
  <div class="page">
    <!-- 面包屑 -->
    <Breadcrumb :crumData="crumData"></Breadcrumb>
    <!-- tab -->
    <div class="headGroup">
      <el-radio-group v-model="radio1" size="small">
        <el-radio-button label="搜索管理"></el-radio-button>
        <el-radio-button label="帮助中心管理"></el-radio-button>
      </el-radio-group>
    </div>
    <!-- 账户管理 -->
    <div v-show="radio1 === '搜索管理'" class="tableContainer">
      <div :gutter="3" class="tableTitle">
        <span :span="6">
            <el-form size="mini" :model="ruleForm" ref="ruleForm"
              label-width="100px">
              <el-form-item label="搜索框文字">
                <el-input placeholder="请输入内容" label="发现文字"
                  v-model="ruleForm.searchValue" class="searchInput">
                </el-input>
              </el-form-item>
            </el-form>
            <el-button class="headEdit" type="primary" size="mini" @click="findFont = !findFont">
              编辑
            </el-button>
        </span>
        <span :span="6">
          <el-button size="mini" type="primary">删除选中项</el-button>
          <el-button size="mini" type="primary"
            @click="dialogFormVisible = true">+ 添加搜索发现文字</el-button>
        </span>
      </div>
      <el-table :data="tableData" size="mini" max-height="550" border stripe style="width: 100%">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" width="55" label="排序">
        </el-table-column>
        <el-table-column prop="character" label="文本内容">
        </el-table-column>
        <el-table-column prop="name" label="文本颜色">
        </el-table-column>
        <el-table-column prop="operating" label="操作">
          <el-button type="text" size="small" class="delet"
            @click="FontEditVisible = true">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </el-table-column>
      </el-table>
      <!-- 模态 -->
      <el-dialog width="30%" title="添加搜索发现文字" :visible.sync="dialogFormVisible">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"
          label-width="100px" class="demo-ruleForm">
          <el-form-item label="排序" prop="account">
            <el-input v-model="ruleForm.account" size="small"
              autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="文本内容" prop="pass">
            <el-input type="password" size="small" v-model="ruleForm.pass"
              autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="文本颜色" prop="checkPass">
            <el-input type="password" size="small" v-model="ruleForm.checkPass"
              autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm('ruleForm')">确认添加
          </el-button>
        </div>
      </el-dialog>
      <!-- 编辑模态 -->
      <el-dialog width="30%" title="添加搜索发现文字" :visible.sync="FontEditVisible">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"
          label-width="100px" class="demo-ruleForm">
          <el-form-item label="排序" prop="account">
            <el-input v-model="ruleForm.account" size="small"
              autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="文本内容" prop="pass">
            <el-input type="password" size="small" v-model="ruleForm.pass"
              autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="文本颜色" prop="checkPass">
            <el-input type="password" size="small" v-model="ruleForm.checkPass"
              autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="FontEditVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm('ruleForm')">确认添加
          </el-button>
        </div>
      </el-dialog>
      <!-- 分页 -->
      <el-pagination class="pagination" background layout="prev, pager, next"
        :pager-count='17' :total="1000">
      </el-pagination>
    </div>
    <!-- 权限管理 -->
    <div v-show="radio1 === '帮助中心管理'" class="tableContainer">
      <div :gutter="5" class="tableTitle">
        <span class="tableName" :span="16"><span>权限列表</span></span>
        <span class="addAccount" :span="8">
          <el-button size="small" type="primary"
            @click="dialogTableVisible = true">+
            新增用户</el-button>
        </span>
      </div>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <!-- <el-checkbox v-model="checked"></el-checkbox> -->
            <div class="collapseItem"><span>序号：</span><span>1</span>
            </div>
            <div class="collapseItem"><span>标题及内容：</span><span>xxxxxxxxx</span>
            </div>
            <div class="collapseItem"><span>
                <el-button type="text" @click.stop="dialogEditVisible = true">编辑
                </el-button>
                <el-button type="text">删除</el-button>
              </span>
            </div>
          </template>
          <el-input type="textarea" v-model="text.desc" :disabled="true">
          </el-input>
        </el-collapse-item>
        <el-collapse-item title="反馈 Feedback" name="2">
          <template slot="title">
            <!-- <el-checkbox v-model="checked"></el-checkbox> -->
            <div class="collapseItem"><span>序号：</span><span>1</span>
            </div>
            <div class="collapseItem"><span>标题及内容：</span><span>xxxxxxxxx</span>
            </div>
            <div class="collapseItem"><span>
                <el-button type="text" @click.stop="dialogEditVisible = true">编辑
                </el-button>
                <el-button type="text">删除</el-button>
              </span>
            </div>
          </template>
          <el-input type="textarea" v-model="text.desc" :disabled="true">
          </el-input>
        </el-collapse-item>
        <el-collapse-item title="效率 Efficiency" name="3">
          <template slot="title">
            <!-- <el-checkbox v-model="checked"></el-checkbox> -->
            <div class="collapseItem"><span>序号：</span><span>1</span>
            </div>
            <div class="collapseItem"><span>标题及内容：</span><span>xxxxxxxxx</span>
            </div>
            <div class="collapseItem"><span>
                <el-button type="text" @click.stop="dialogEditVisible = true">编辑
                </el-button>
                <el-button type="text">删除</el-button>
              </span>
            </div>
          </template>
          <el-input type="textarea" v-model="text.desc" :disabled="true">
          </el-input>
        </el-collapse-item>
      </el-collapse>
      <!-- 模态 -->
      <el-dialog width="50%" title="添加帮助内容" :visible.sync="dialogTableVisible">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"
          label-width="100px" class="demo-ruleForm">
          <el-form-item class="jueseName" label="标题">
            <el-input v-model="jueSeName" size="small" autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item class="jueseName" label="内容">
            <el-input v-model="jueSeName" size="small" autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item class="jueseName" label="排序">
            <el-input v-model="jueSeName" size="small" autocomplete="off">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm('ruleForm')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑模态框 -->
      <el-dialog width="50%" title="添加帮助内容" :visible.sync="dialogEditVisible">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"
          label-width="100px" class="demo-ruleForm">
          <el-form-item class="jueseName" label="排序">
            <el-input v-model="jueSeName" size="small" autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item class="jueseName" label="标题">
            <el-input v-model="jueSeName" size="small" autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item class="jueseName" label="内容">
            <el-input type="textarea" v-model="text.desc"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogEditVisible = false">取 消</el-button>
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
export default {
  data() {
    var validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'))
      } else if (!/^[a-zA-Z0-9]{6,18}$/.test(value)) {
        callback(new Error('请输入6~18位可由字母和数字组成的账号'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }

    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!/^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,})$/.test(value)) {
        callback(new Error('请输入至少8位数字字母组成的密码'))
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
      radio1: '搜索管理',
      dialogEditVisible: false,
      FontEditVisible: false,
      findFont: true,
      activeNames: '',
      overView: [],
      management: [],
      content: [],
      setting: [],
      text: { desc: null },
      jueSeName: '',
      crumData: {
        breadItem: [{ name: '内容' }, { name: '其他管理' }],
        leadingIn: false,
        leadingOut: false
      },
      tableData: [
        {
          accountNumber: '2016-05-02',
          character: '管理员',
          name: '王小虎',
          phoneNumber: '13888888888',
          staus: 200
        },
        {
          accountNumber: '2016-05-04',
          character: '管理员',
          name: '王小虎',
          phoneNumber: '13888888888',
          staus: 200
        },
        {
          accountNumber: '2016-05-01',
          character: '管理员',
          name: '王小虎',
          phoneNumber: '13888888888',
          staus: 200
        },
        {
          accountNumber: '2016-05-03',
          character: '管理员',
          name: '王小虎',
          phoneNumber: '13888888888',
          staus: 200
        }
      ],
      JueseTableData: [
        {
          character: '管理员',
          havePower: '王小虎'
        },
        {
          character: '管理员',
          havePower: '王小虎'
        },
        {
          character: '管理员',
          havePower: '王小虎'
        },
        {
          character: '管理员',
          havePower: '王小虎'
        }
      ],
      dialogFormVisible: false,
      dialogTableVisible: false,
      ruleForm: {
        pass: '',
        checkPass: '',
        account: ''
      },
      rules: {
        account: [{ required: true, validator: validateAccount, trigger: 'blur' }],
        pass: [{ required: true, validator: validatePass, trigger: 'blur' }],
        checkPass: [{ required: true, validator: validatePass2, trigger: 'blur' }],
        region: [{ required: true, message: '请选择活动区域', trigger: 'change' }]
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    confirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
          this.dialogFormVisible = false
        } else {
          console.log('error submit!!')
          return false
          this.dialogFormVisible = true
        }
      })
    }
  },
  mounted() {
    console.log(1)
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

.collapseItem {
  margin-right: 30px;
}

.headEdit {
  margin-left: 10px; 
}
</style>



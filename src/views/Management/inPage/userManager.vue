<template>
  <div class="page">
    <!-- 面包屑 -->
    <Breadcrumb :crumData="crumData"></Breadcrumb>
    <!-- tab -->
    <h3 class="title">商家绑定用户管理</h3>
    <!-- 账户管理 -->
    <div class="tableContainer">
      <el-row :gutter="5" class="tableTitle">
        <el-col class="tableName" :span="20"><span>商家ID：xxxxxxxxxx</span><span>商家名称：xxxxxxxx</span></el-col>
        <el-col class="addAccount" :span="4">
          <el-button size="small" type="primary" @click="dialogIDVisible = true">+
            添加用户ID</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column type="index" label="编号" width="50">
        </el-table-column>
        <el-table-column prop="character" label="用户ID">
        </el-table-column>
        <el-table-column prop="phoneNumber" label="操作">
          <el-button type="text" size="small" @click="dialogEditIDVisible = true">编辑</el-button>
          <el-button type="text" size="small" class="delet">删除</el-button>
        </el-table-column>
      </el-table>
      <!-- 添加ID模态框 -->
      <el-dialog width="30%" title="添加用户ID" :visible.sync="dialogIDVisible">
        <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px"
          class="demo-ruleForm">
          <el-form-item label="用户ID">
            <el-input v-model="ruleForm.account" size="small" autocomplete="off"
              placeholder="添加用户ID">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogIDVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm('ruleForm')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑模态框 -->
      <el-dialog width="30%" title="编辑用户ID" :visible.sync="dialogEditIDVisible">
        <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px"
          class="demo-ruleForm">
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
      radio1: '账户管理',
      overView: [],
      management: [],
      content: [],
      setting: [],
      jueSeName: '',
      dialogIDVisible: false,
      dialogEditIDVisible: false,
      ruleForm: { account: '' },
      crumData: [{ name: '设置' }, { name: '账户权限' }, { name: '账户管理' }],
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
      ]
    }
  },
  watch: {
    radio1(newValue) {
      this.crumData = [{ name: '设置' }, { name: '账户权限' }, { name: newValue }]
    }
  },
  methods: {
    confirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
          this.dialogIDVisible = false
        } else {
          console.log('error submit!!')
          return false
          this.dialogIDVisible = true
        }
      })
    },
    edit() {}
  },
  mounted() {
    console.log(1)
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

.breadcrumb-box {
  border: 1px solid #e1e1e1;
  padding: 20px;
  border-right: none;
  border-left: none;
}

.headGroup {
  padding: 0 15px;
}

.tableContainer {
  padding: 0 15px;
  flex: 1;
  position: relative;
  .tableTitle {
    display: flex;
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

.pagination {
  position: absolute;
  bottom: 75px;
  left: calc(50% - 505px);
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
<template>
  <!-- 用户管理 -->
  <div class="page">
    <!-- 面包屑 -->
    <Breadcrumb :crumData="crumData"></Breadcrumb>
    <!-- 账户管理 -->
    <div class="tableContainer">
      <el-row :gutter="3" class="tableTitle">
        <el-col :span="6" class="calendarContainer">
          <el-date-picker size="mini" v-model="value1" type="daterange"
            class="calendar" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <div class="el-input-group__append">
            <el-button class="calendarButton" icon="el-icon-search"></el-button>
          </div>

        </el-col>
        <el-col :span="12" class="searchContainer">
          <el-input size="mini" placeholder="请输入内容" v-model="searchValue"
            class="searchInput">
            <el-select v-model="searchSelect" slot="prepend"
              class="searchSelect" placeholder="请选择">
              <el-option label="餐厅名" value="1"></el-option>
              <el-option label="订单号" value="2"></el-option>
              <el-option label="用户电话" value="3"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-button size="mini" type="primary">查看全部</el-button>
          <el-button size="mini" type="primary">删除选中项</el-button>
        </el-col>
      </el-row>
      <el-table ref="multipleTable" @selection-change="handleSelectionChange"
        :data="tableData" border stripe style="width: 100%">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="accountNumber" label="编号">
        </el-table-column>
        <el-table-column prop="character" label="用户ID" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="character" label="微信昵称">
        </el-table-column>
        <el-table-column prop="character" label="注册时间">
        </el-table-column>
        <el-table-column prop="character" label="手机号">
        </el-table-column>
        <el-table-column prop="character" label="头像">
        </el-table-column>
        <el-table-column prop="character" label="绑定商家">
        </el-table-column>
        <el-table-column prop="character" label="账户内余额">
        </el-table-column>
        <el-table-column prop="operating" label="操作">
          <el-button type="text" size="small" @click="dialogFormVisible = true">
            编辑</el-button>
          <el-button type="text" size="small" class="delet">删除</el-button>
          <el-button type="text" size="small" @click="toBillDetail">账单详情
          </el-button>
        </el-table-column>

      </el-table>
      <!-- 分页 -->
      <el-pagination class="pagination" background layout="prev, pager, next"
        :pager-count='17' :total="1000">
      </el-pagination>
    </div>

    <!-- 编辑模态 -->
    <el-dialog width="30%" title="新增用户" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="微信昵称" prop="nickName">
          <el-input v-model="ruleForm.account" size="small" autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNumber">
          <el-input type="password" size="small" v-model="ruleForm.pass"
            autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="绑定商家" prop="bangding">
          <el-input type="password" size="small" v-model="ruleForm.checkPass"
            autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <vueCropper>111111</vueCropper>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
export default {
  data() {
    return {
      dialogFormVisible: false,
      dialogTableVisible: false,
      crumData: {
        breadItem: [{ name: '设置' }, { name: '用户管理' }],
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
      value1: '',
      value2: '',
      searchValue: '',
      searchSelect: '',
      multipleSelection: [],
      ruleForm: {
        nickName: '',
        phoneNumber: '',
        bangding: ''
      }
    }
  },
  methods: {
    newAccount() {},
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    edit() {
      this.dialogFormVisible = true
    },
    toBillDetail() {
      this.$router.push({ name: 'BillDetail' })
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
  text-align: left;
}

.tableContainer {
  text-align: left;
  padding: 0 15px;
  flex: 1;
  position: relative;
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

.pagination {
  position: absolute;
  bottom: 75px;
  left: calc(50% - 505px);
}

.searchInput {
  width: 80%;
}

.calendar {
  max-width: 200px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.calendarContainer {
  display: flex;
  .el-input-group__append {
    width: 13px;
  }
  .calendarButton {
    font-size: 1px;
    margin: -5px -20px;
  }
}

.el-select .el-input {
  width: 130px;
}

.searchSelect {
  width: 100px;
}

.vue-cropper {
  height: 100px;
}
</style>

<style>
.searchContainer .searchInput .el-input-group__prepend {
  background: #fff;
}
</style>


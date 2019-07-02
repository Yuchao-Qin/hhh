<template>
  <!-- 工作日志 -->
  <div class="page">
    <!-- 面包屑 -->
    <Breadcrumb :crumData="crumData"></Breadcrumb>
    <!-- 账户管理 -->
    <div class="tableContainer">
      <div :gutter="3" class="tableTitle">
        <span :span="6">
          <el-date-picker size="mini" v-model="value1" type="daterange" class="calendar"
            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </span>
        <span :span="6">
          <el-input size="mini" placeholder="请输入内容" v-model="searchValue" class="searchInput">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </span>
        <span :span="8">
          <el-button size="mini" type="primary">查看全部</el-button>
        </span>
      </div>
      <el-table size="mini" max-height="550" :data="tableData" border stripe style="width: 100%">
        <el-table-column prop="accountNumber" label="操作日期">
        </el-table-column>
        <el-table-column prop="character" label="用户">
        </el-table-column>
        <el-table-column prop="operating" label="操作">
          <el-button type="text" size="small" class="delet">删除</el-button>
          <el-button type="text" size="small" @click="dialogFormVisible = true">修改</el-button>
        </el-table-column>
        <el-table-column prop="FromIp" label="来源IP">
        </el-table-column>

      </el-table>

      <el-dialog width="30%" title="新增用户" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="用户" prop="nickName">
          <el-input v-model="ruleForm.account" size="small" autocomplete="off">
          </el-input>
        </el-form-item>
      </el-form>
      <vueCropper>111111</vueCropper>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
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
    return {
      dialogFormVisible:false,
      ruleForm:{
        account:''
      },
      crumData: {
        breadItem: [{ name: '设置' }, { name: '账户权限' }, { name: '账户管理' }],
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
      searchValue: ''
    }
  },
  methods: {
    newAccount() {}
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

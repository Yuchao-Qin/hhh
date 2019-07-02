<template>
  <!-- 用户管理 -->
  <div class="page">
    <!-- 面包屑 -->
    <Breadcrumb :crumData="crumData"></Breadcrumb>
    <!-- 账户管理 -->
    <div class="tableContainer">
      <div :gutter="3" class="tableTitle">
        <span :span="6" class="searchContainer">
          <el-input size="mini" placeholder="请输入内容" v-model="searchValue" class="searchInput">
            <el-select v-model="searchSelect" slot="prepend" class="searchSelect"
              placeholder="请选择">
              <el-option label="分类ID" value="1"></el-option>
              <el-option label="子分类ID" value="2"></el-option>
              <el-option label="上级主分类ID" value="3"></el-option>
              <el-option label="级别" value="4"></el-option>
              <el-option label="名称" value="5"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </span>
      </div>
      <el-table size="mini" max-height="550" ref="multipleTable" @selection-change="handleSelectionChange"
        :data="tableData" border stripe style="width: 100%">
        <el-table-column type="index" width="55" label="序号">
        </el-table-column>
        <el-table-column prop="accountNumber" label="分类ID">
        </el-table-column>
        <el-table-column prop="character" label="子分类ID" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="character" label="上级著分类ID">
        </el-table-column>
        <el-table-column prop="character" label="级别">
        </el-table-column>
        <el-table-column prop="character" label="名称">
        </el-table-column>
        <el-table-column prop="character" label="分类排序">
        </el-table-column>
        <el-table-column prop="character" label="操作">
          <el-button type="text" size="small" @click="dialogFormVisible = true">编辑</el-button>
        </el-table-column>

      </el-table>
      <!-- 分页 -->
      <el-pagination class="pagination" background layout="prev, pager, next"
        :pager-count='17' :total="1000">
      </el-pagination>
    </div>

    <!-- 编辑模态 -->
    <el-dialog width="30%" title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="名称" prop="nickName">
          <el-input v-model="ruleForm.account" size="small" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类排序" prop="phoneNumber">
          <el-input type="password" size="small" v-model="ruleForm.pass"
            autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
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
        breadItem: [{ name: '内容' }, { name: '导航管理' }],
        leadingIn: true,
        leadingOut: true
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
      },
      addMenu: '',
      menuVisible: false,
      subjectVisible: false,
      subjectMenu: ''
    }
  },
  watch: {
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
.popoverButton {
  margin-left: 10px;
}
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
  text-align: right;
}
.addAccount {
  text-align: left;
}
.delet {
  color: red;
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

.addMenuButtonContainer {
  text-align: center;
  margin-top: 28px;
}
</style>

<style>
.searchContainer .searchInput .el-input-group__prepend {
  background: #fff;
}
</style>

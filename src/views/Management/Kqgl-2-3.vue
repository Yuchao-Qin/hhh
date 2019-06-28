<template>
  <!-- 用户管理 -->
  <div class="page">
    <!-- 面包屑 -->
    <Breadcrumb :crumData="crumData"></Breadcrumb>
    <!-- 账户管理 -->
    <div class="tableContainer">
      <el-row :gutter="3" class="tableTitle">
        <el-col :span="6" class="calendarContainer">
          <div class="ji_huo_Time">激活时间：</div>
          <el-date-picker size="mini" v-model="value1" type="daterange" class="calendar"
            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
          <div class="el-input-group__append">
            <el-button class="calendarButton" icon="el-icon-search"></el-button>
          </div>
        </el-col>
        <el-col :span="6" class="searchContainer">
          <el-input size="mini" placeholder="请输入内容" v-model="searchValue" class="searchInput">
            <el-select v-model="searchSelect" slot="prepend" class="searchSelect"
              placeholder="请选择" >
              <el-option label="激活用户ID" value="1"></el-option>
              <el-option label="所属商家ID" value="2"></el-option>
              <el-option label="所属商家名称" value="3"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6" class="searchContainer">
          <div class="headerSelect">
            <el-select v-model="searchSelect" class="searchSelect" size="mini" placeholder="请选择">
              <el-option label="激活用户ID" value="1"></el-option>
              <el-option label="所属商家ID" value="2"></el-option>
              <el-option label="所属商家名称" value="3"></el-option>
            </el-select>
          </div>

        </el-col>
        <el-col :span="8">
          <el-button size="mini" type="primary">清除筛选</el-button>
          <el-button size="mini" type="primary">导出</el-button>
        </el-col>
      </el-row>
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item name="1">
          <template slot="title">
            <el-checkbox v-model="checked"></el-checkbox>
            <div class="collapseItem"><span>商家名称：</span><span>xxxxxxxxx</span></div>
            <div class="collapseItem"><span>优惠卡数量：</span><span>xxxxxxxxx</span></div>
            <div class="collapseItem"><span>优惠卡总金额：</span><span>xxxxxxxxx</span></div>
          </template>
          <el-table ref="multipleTable" @selection-change="handleSelectionChange"
            :data="tableData" border stripe style="width: 100%">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="accountNumber" label="编号">
            </el-table-column>
            <el-table-column prop="character" label="卡金额" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="character" label="所属商家ID">
            </el-table-column>
            <el-table-column prop="character" label="卡密">
            </el-table-column>
            <el-table-column prop="character" label="激活卡时间">
            </el-table-column>
            <el-table-column prop="character" label="激活用户ID">
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item title="反馈 Feedback" name="2">
          <template slot="title">
            <el-checkbox v-model="checked"></el-checkbox>
            <div class="collapseItem"><span>商家名称：</span><span>xxxxxxxxx</span></div>
            <div class="collapseItem"><span>优惠卡数量：</span><span>xxxxxxxxx</span></div>
            <div class="collapseItem"><span>优惠卡总金额：</span><span>xxxxxxxxx</span></div>
          </template>
          <el-table ref="multipleTable" @selection-change="handleSelectionChange"
            :data="tableData" border stripe style="width: 100%">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="accountNumber" label="编号">
            </el-table-column>
            <el-table-column prop="character" label="卡金额" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="character" label="所属商家ID">
            </el-table-column>
            <el-table-column prop="character" label="卡密">
            </el-table-column>
            <el-table-column prop="character" label="激活卡时间">
            </el-table-column>
            <el-table-column prop="character" label="激活用户ID">
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item title="效率 Efficiency" name="3">
          <template slot="title">
            <el-checkbox v-model="checked"></el-checkbox>
            <div class="collapseItem"><span>商家名称：</span><span>xxxxxxxxx</span></div>
            <div class="collapseItem"><span>优惠卡数量：</span><span>xxxxxxxxx</span></div>
            <div class="collapseItem"><span>优惠卡总金额：</span><span>xxxxxxxxx</span></div>
          </template>
          <el-table ref="multipleTable" @selection-change="handleSelectionChange"
            :data="tableData" border stripe style="width: 100%">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="accountNumber" label="编号">
            </el-table-column>
            <el-table-column prop="character" label="卡金额" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="character" label="所属商家ID">
            </el-table-column>
            <el-table-column prop="character" label="卡密">
            </el-table-column>
            <el-table-column prop="character" label="激活卡时间">
            </el-table-column>
            <el-table-column prop="character" label="激活用户ID">
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
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
          <el-input v-model="ruleForm.account" size="small" autocomplete="off"></el-input>
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
      checked: '',
      dialogFormVisible: false,
      dialogTableVisible: false,
      radio1: '账户管理',
      activeNames: '',
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
      searchValue: '',
      searchSelect: '1',
      multipleSelection: [],
      ruleForm: {
        nickName: '',
        phoneNumber: '',
        bangding: ''
      }
    }
  },
  watch: {
    radio1(newValue) {
      this.crumData = [{ name: '设置' }, { name: '账户权限' }, { name: newValue }]
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
    },
    handleChange(val) {
      console.log(val)
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

.breadcrumb-box {
  border: 1px solid #e1e1e1;
  padding: 20px;
  border-right: none;
  border-left: none;
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
  width: 120px;
}

.vue-cropper {
  height: 100px;
}

.collapseItem {
  margin-right: 30px;
}

.ji_huo_Time {
  font-size: 14px;
  line-height: 28px;
}

.headerSelect {
  height: 28px;
}
</style>

<style>
.searchContainer .searchInput .el-input-group__prepend {
  background: #fff;
}
</style>

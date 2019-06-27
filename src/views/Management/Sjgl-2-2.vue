<template>
  <!-- 商家管理 -->
  <div class="page">
    <!-- 面包屑 -->
    <Breadcrumb :crumData="crumData"></Breadcrumb>
    <!-- 账户管理 -->
    <div class="tableContainer">
      <el-row :gutter="3" class="tableTitle">
        <el-col :span="6" class="calendarContainer">
          <DatePicker @Datepicker="DateP = $event"></DatePicker>

        </el-col>
        <el-col :span="12" class="searchContainer">
          <el-input size="mini" placeholder="请输入内容" v-model="searchValue" class="searchInput">
            <el-select v-model="searchSelect" slot="prepend" class="searchSelect"
              placeholder="请选择">
              <el-option label="商家ID" value="1"></el-option>
              <el-option label="商家名称" value="2"></el-option>
              <el-option label="联系人姓名" value="3"></el-option>
              <el-option label="联系人手机号" value="4"></el-option>
              <el-option label="联系人联系地址" value="5"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-button size="mini" type="primary">查看全部</el-button>
          <el-button size="mini" type="primary" @click="dialogBatchCard = true">批量生成优惠卡</el-button>
          <el-button size="mini" type="primary" @click="dialogFormVisible = true">
            + 添加商家</el-button>
        </el-col>
      </el-row>
      <el-table ref="multipleTable" @selection-change="handleSelectionChange"
        :data="tableData" border stripe style="width: 100%">
        <el-table-column type="selection" width="35">
        </el-table-column>
        <el-table-column prop="accountNumber" label="编号">
        </el-table-column>
        <el-table-column prop="character" label="用户ID" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="character" label="微信昵称">
        </el-table-column>
        <el-table-column prop="character" width="100" label="注册时间">
        </el-table-column>
        <el-table-column prop="character" width="100" label="手机号">
        </el-table-column>
        <el-table-column prop="character" label="头像">
        </el-table-column>
        <el-table-column prop="character" label="绑定商家">
        </el-table-column>
        <el-table-column prop="character" width="200px">
          <template slot="header" slot-scope="">
            <el-select v-model="tableSelectValue" size="mini" placeholder="禁用状态">
              <el-option label="未禁用" value="未禁用">
              </el-option>
              <el-option label="禁用" value="禁用">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="operating" label="操作">
          <el-button type="text" size="small" @click="dialogFormVisible = true">编辑</el-button>
          <el-button type="text" size="small" @click="dialogCardVisible = true">生成优惠卡</el-button>
          <el-button type="text" size="small" @click="toUserManager">绑定用户管理</el-button>
        </el-table-column>

      </el-table>
      <!-- 分页 -->
      <el-pagination class="pagination" background layout="prev, pager, next"
        :pager-count='17' :total="1000">
      </el-pagination>
    </div>

    <!-- 编辑模态框 -->
    <el-dialog width="30%" title="添加商家" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px"
        class="demo-ruleForm">
        <!-- 商家名称、联系人姓名、手机号、门店地址、禁用状态 -->
        <el-form-item label="商家名称" prop="nickName">
          <el-input v-model="ruleForm.account" size="small" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名" prop="phoneNumber">
          <el-input size="small" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人手机号" prop="bangding">
          <el-input size="small" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="门店地址" prop="bangding">
          <el-input type="textarea" size="small" v-model="ruleForm.checkPass"
            autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="禁用状态" prop="forbidden" class="forbiddenSelect">
          <el-select v-model="ruleForm.forbidden" placeholder="请选择">
            <el-option label="已禁用" value="1"></el-option>
            <el-option label="未禁用" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 生成优惠卡 -->
    <el-dialog width="30%" title="生成优惠卡" :visible.sync="dialogCardVisible">
      <div class="card">
        <div class="cardItem">商家ID：<span>B</span></div>
        <div class="cardItem">商家名称：<span>xxxx</span></div>
        <div class="cardItem">优惠卡总金额：<span>100</span></div>
        <div class="cardItem">
          <div>单张卡金额：</div>
          <el-input v-model="cardItemMoney" placeholder="请输入卡金额"></el-input>
        </div>
        <div class="cardItem">优惠卡数量：<el-input v-model="cardItemMoney"
            placeholder="请输入卡数量"></el-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 批量生成优惠卡 -->
    <el-dialog width="60%" title="批量生成优惠卡" :visible.sync="dialogBatchCard">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="商家ID">
        </el-table-column>
        <el-table-column label="商家名称">
        </el-table-column>
        <el-table-column label="单张卡金额">
        </el-table-column>
        <el-table-column label="优惠卡数量" prop="name">
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.accountNumber"
              placeholder="请输入卡金额"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="单张卡金额">
          <template slot-scope="scope">
            <el-input v-model="scope.row.accountNumber " placeholder="请输入卡金额"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="单张卡金额">
          <!-- <template slot-scope="scope">
            <el-button @click="handleEdit(scope.$index, scope.row, scope)">bianji</el-button>
          </template> -->
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogBatchCard = false">取 消</el-button>
        <el-button type="primary">确认生成</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
import DatePicker from '@/components/DatePicker.vue'
export default {
  data() {
    return {
      dialogFormVisible: false,
      dialogCardVisible: false,
      dialogBatchCard: false,
      tableTestshow: true,
      tabtest: true,
      radio1: '账户管理',
      tableSelectValue: '',
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
      ],
      DateP: '',
      value2: '',
      searchValue: '',
      searchSelect: '',
      cardItemMoney: '',
      multipleSelection: [],
      ruleForm: {
        nickName: '',
        phoneNumber: '',
        bangding: '',
        forbidden: ''
      },
      forbidden: ''
    }
  },
  watch: {
    radio1(newValue) {
      this.crumData = [{ name: '设置' }, { name: '账户权限' }, { name: newValue }]
    },
    tableData: {
      handler: function(newval) {
        console.log(newval)
        newval.forEach((item, i) => {
          if (item.accountNumber < 1) {
            item.accountNumber = 1
          }
        })
      },
      deep: true
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
    toUserManager() {
      this.$router.push({ name: 'userManager' })
    },
    handleEdit(a, b, c) {
      console.log(a, b, c)
      this.tableTestshow = false
      this.tableReload()
    },
    tableReload() {
      this.tabtest = false
      this.$nextTick(() => {
        this.tabtest = true
      })
    }
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

.card {
  text-align: left;
  .cardItem {
    line-height: 60px;
    height: 60px;
    display: flex;
    justify-content: flex-start;
    .el-input {
      width: 60%;
    }
  }
}

.forbiddenSelect .el-select {
  width: 100%;
}
</style>

<style>
.searchContainer .searchInput .el-input-group__prepend {
  background: #fff;
}
</style>

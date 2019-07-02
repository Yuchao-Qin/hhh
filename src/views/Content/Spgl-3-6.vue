<template>
  <!-- 用户管理 -->
  <div class="page">
    <!-- 面包屑 -->
    <Breadcrumb :crumData="crumData"></Breadcrumb>
    <!-- 账户管理 -->
    <div class="tableContainer">
      <div :gutter="3" class="tableTitle">
        <span :span="4" class="calendarContainer">
          <DatePicker @Datepicker="DateP = $event"></DatePicker>

        </span>
        <span :span="6" class="searchContainer">
          <el-input size="mini" placeholder="请输入内容" v-model="searchValue" class="searchInput">
            <el-select v-model="searchSelect" slot="prepend" class="searchSelect"
              placeholder="请选择">
              <el-option label="餐厅名" value="1"></el-option>
              <el-option label="订单号" value="2"></el-option>
              <el-option label="用户电话" value="3"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </span>
        <span :span="8">
          <el-button size="mini" type="primary">查看全部</el-button>
          <el-button size="mini" type="primary">删除选中项</el-button>
          <el-popover class="popoverButton" placement="left" width="200"
            trigger="click" v-model="subjectVisible">
            <el-select size="mini" v-model="subjectMenu">
              <el-option value="1" label="专题A"></el-option>
              <el-option value="2" label="专题B"></el-option>
              <el-option value="3" label="专题C"></el-option>
            </el-select>
            <div class="addMenuButtonContainer">
              <el-button size="mini" type="primary" @click="subjectVisible=false">确认添加</el-button>
            </div>
            <el-button slot="reference" size="mini" type="primary">添加至专题</el-button>
          </el-popover>

          <el-popover class="popoverButton" placement="left" width="200"
            trigger="click" v-model="menuVisible">
            <el-select size="mini" v-model="addMenu">
              <el-option value="1" label="热销专区"></el-option>
              <el-option value="2" label="9.9包邮"></el-option>
              <el-option value="3" label="特惠专区"></el-option>
              <el-option value="4" label="品牌优选"></el-option>
              <el-option value="5" label="大额抵扣"></el-option>
            </el-select>
            <div class="addMenuButtonContainer">
              <el-button size="mini" type="primary" @click="menuVisible=false">确认添加</el-button>
            </div>
            <el-button slot="reference" size="mini" type="primary">添加至菜单</el-button>
          </el-popover>

        </span>
      </div>
      <el-table size="mini" max-height="550" ref="multipleTable" @selection-change="handleSelectionChange"
        :data="tableData" border stripe style="width: 100%">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="accountNumber" label="编号">
        </el-table-column>
        <el-table-column prop="character" label="商品ID" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="character" label="商品名称">
        </el-table-column>
        <el-table-column prop="character" label="商品主图">
        </el-table-column>
        <el-table-column prop="character" label="商品详情页链接地址">
        </el-table-column>
        <el-table-column prop="character" label="商品一级类目">
        </el-table-column>
        <el-table-column prop="character" label="商品价格（元）">
        </el-table-column>
        <el-table-column prop="character" label="商品月销量">
        </el-table-column>
        <el-table-column prop="character" label="店铺名称">
        </el-table-column>
        <el-table-column prop="character" label="优惠券ID">
        </el-table-column>
        <el-table-column prop="character" label="优惠券剩余量">
        </el-table-column>
        <el-table-column prop="character" label="优惠券面额">
        </el-table-column>
        <el-table-column prop="character" label="优惠券开始时间">
        </el-table-column>
        <el-table-column prop="character" label="优惠券结束时间">
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
import DatePicker from '@/components/DatePicker.vue'
export default {
  data() {
    return {
      dialogFormVisible: false,
      dialogTableVisible: false,
      radio1: '账户管理',
      crumData: {
        breadItem: [{ name: '内容' }, { name: '商品管理' }],
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
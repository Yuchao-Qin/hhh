<template>
  <!-- 反馈管理 -->
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
              <el-option label="用户ID" value="1"></el-option>
              <el-option label="描述" value="2"></el-option>
              <el-option label="联系方式" value="3"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-button size="mini" type="primary">清楚筛选</el-button>
        </el-col>
      </el-row>
      <el-table ref="multipleTable" :data="tableData" border stripe style="width: 100%">
        <el-table-column prop="character" class-name="selectTableHeader" width="200px">
          <template slot="header" slot-scope="{}">
            <el-select v-model="fan_kui_status" size="mini" placeholder="反馈状态">
              <el-option label="问题" value="1">
              </el-option>
              <el-option label="建议" value="2">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="accountNumber" label="发送用户ID">
        </el-table-column>
        <el-table-column prop="character" label="反馈时间" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="character" label="描述">
        </el-table-column>
        <el-table-column prop="character" width="100" label="联系方式">
        </el-table-column>
        <el-table-column prop="character" width="100" label="手机号">
        </el-table-column>
        <el-table-column prop="character" label="头像">
        </el-table-column>
        <el-table-column prop="character" label="绑定商家">
        </el-table-column>
        <el-table-column prop="character" class-name="selectTableHeader" width="200px">
          <template slot="header" slot-scope="{}">
            <el-select v-model="tableSelectValue" size="mini" placeholder="处理状态">
              <el-option label="处理状态" key="1" value="1">
              </el-option>
              <el-option label="已处理" key="2" value="2">
              </el-option>
              <el-option label="未处理" key="3" value="3">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="operating" label="图片">
          <el-button type="text" size="small" @click="dialogFormVisible = true">反馈图片</el-button>
        </el-table-column>

      </el-table>
      <!-- 分页 -->
      <el-pagination class="pagination" background layout="prev, pager, next"
        :pager-count='17' :total="1000">
      </el-pagination>
    </div>

    <!-- 反馈图片模态框 -->
    <el-dialog width="30%" title="添加商家" :visible.sync="dialogFormVisible">
      <img src="" alt="">
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
      dialogCardVisible: false,
      dialogBatchCard: false,
      tableTestshow: true,
      tabtest: true,
      radio1: '账户管理',
      tableSelectValue: '',
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
      forbidden: '',
      fan_kui_status: ''
    }
  },
  watch: {
    radio1(newValue) {
      this.crumData = [{ name: '设置' }, { name: '账户权限' }, { name: newValue }]
    }
  },
  methods: {
    newAccount() {}
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

.selectTableHeader .el-table th div {
  line-height: 0;
}

.selectTableHeader .el-table .cell {
  line-height: 0;
}
</style>


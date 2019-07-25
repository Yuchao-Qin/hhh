<template>
  <!-- 用户管理 -->
  <div class="page">
    <!-- 面包屑 -->
    <Breadcrumb :crumData="crumData"></Breadcrumb>
    <!-- 账户管理 -->
    <div class="tableContainer">
      <div :gutter="3" class="tableTitle">
        <!-- <el-col :span="6" class="calendarContainer"> -->
        <span class="calendarContainer fl margin10">
          <DatePicker :pic.sync="searchItem.date"></DatePicker>
        </span>
        <!-- </el-col> -->
        <!-- <el-col :span="8" > -->
        <span class="searchContainer fl">
          <el-input size="mini" placeholder="请输入内容" v-model="searchValue"
            class="searchInput">
            <el-select v-model="searchSelect" slot="prepend"
              class="searchSelect" placeholder="请选择">
              <el-option label="用户ID" value="account"></el-option>
              <el-option label="微信昵称" value="nickname"></el-option>
              <el-option label="手机号" value="phone"></el-option>
              <el-option label="绑定商家账号" value="bid"></el-option>
            </el-select>
          </el-input>
        </span>

        <!-- </el-col> -->
        <!-- <el-col :span="8"> -->
        <span class="headerButtonGroup fr">
          <el-button size="mini" type="primary" @click="screen">筛选</el-button>
          <el-button size="mini" type="primary" @click="clearScreen">清除筛选
          </el-button>
          <el-button size="mini" type="primary" @click="disabled">禁用选中项
          </el-button>
          <el-button size="mini" type="primary" @click="deldisabled">解除禁用选中项
          </el-button>
        </span>

        <!-- </el-col> -->
      </div>
      <el-table size="mini" max-height="550" ref="multipleTable"
        empty-text="数据为空" @selection-change="handleSelectionChange"
        :data="tableData" border stripe style="width: 100%">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="accountNumber" type="index" label="编号">
        </el-table-column>
        <el-table-column prop="account" label="用户ID">
        </el-table-column>
        <el-table-column prop="nickname" :formatter="formatter" label="微信昵称">
        </el-table-column>
        <el-table-column prop="register_time" label="注册时间">
        </el-table-column>
        <el-table-column prop="phone" label="手机号">
        </el-table-column>
        <el-table-column prop="character" label="头像">
          <template slot-scope="scope">
            <a :href="scope.row.icon" target="view_window">
              <el-image style="width: 100px; height: 100px"
                :src="scope.row.icon" fit="fill"></el-image>
            </a>
          </template>
        </el-table-column>
        <el-table-column prop="shop_name" label="绑定商家">
        </el-table-column>
        <el-table-column prop="money" label="账户内余额">
        </el-table-column>
        <el-table-column prop="operating" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small"
              @click="editTableFun(scope.row)">
              编辑</el-button>
            <!-- <el-button type="text" size="small" class="delet">禁用</el-button> -->
            <el-button type="text" size="small" @click="toBillDetail(scope.row)">账单详情
            </el-button>
          </template>
          <!-- <el-button type="text" size="small" @click="editTableFun(scope.row)">
            编辑</el-button>
          <el-button type="text" size="small" class="delet">禁用</el-button>
          <el-button type="text" size="small" @click="toBillDetail">账单详情
          </el-button> -->
        </el-table-column>

      </el-table>
      <!-- 分页 -->
      <el-pagination class="pagination" background layout="prev, pager, next"
        @current-change="handleCurrentChange" :current-page.sync="currentPage"
        :total="total">
      </el-pagination>
    </div>

    <!-- 编辑模态 -->
    <el-dialog width="30%" title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rule" status-icon ref="ruleForm"
        label-width="100px" class="demo-ruleForm">
        <el-form-item class="jueseName" label="昵称" prop="nickname">
          <el-input v-model="ruleForm.nickname" size="small" autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item class="jueseName" label="手机号" prop="phone">
          <el-input size="small" v-model="ruleForm.phone" autocomplete="off">
          </el-input>
        </el-form-item>
        <!-- <el-form-item class="jueseName" label="绑定商家" prop="bid">
          <el-input  size="small" v-model="ruleForm.bid"
            autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item class="jueseName" label="是否禁用" prop="is_disabled">
          <el-select v-model="ruleForm.is_disabled" size="small">
            <el-option label="禁用" value="1"></el-option>
            <el-option label="正常" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <Pic :pid.sync="ruleForm.icon" :upImgEdit="ruleForm.icon">
        <template>点击上传头像</template></Pic>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="Editconfirm('ruleForm')">确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
import Pic from '@/components/PictureUpload.vue'
import DatePicker from '@/components/DatePicker.vue'
import { isNull } from 'util'
export default {
  data() {
    return {
      searchData: {},
      slectInputData: {},
      currentPage: 1,
      total: 0,
      id: '',
      upImgEdit: '',
      searchItem: {
        date: ''
      },
      dialogFormVisible: false,
      dialogTableVisible: false,
      crumData: {
        breadItem: [{ name: '管理' }, { name: '用户管理' }],
        leadingIn: false,
        leadingOut: false
      },
      tableData: [],
      value1: '',
      value2: '',
      searchValue: '',
      searchSelect: '',
      multipleSelection: [],
      ruleForm: {
        nickname: '',
        phone: '',
        // bid: '',
        is_disabled: '',
        icon: ''
      },
      rule: {
        nickname: [{ required: true, message: '内容不可为空', trigger: 'blur' }],
        phone: [{ required: true, message: '内容不可为空', trigger: 'blur' }],
        bid: [{ required: true, message: '内容不可为空', trigger: 'blur' }],
        is_disabled: [{ required: true, message: '内容不可为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 分页
    handleCurrentChange(val) {
      this.searchItem.date = this.searchData.date
      if (JSON.stringify(this.slectInputData) != '{}') {
        this.searchSelect = Object.keys(this.slectInputData)[0]
        this.searchValue = this.slectInputData[this.searchSelect]
      } else {
        this.searchValue = ''
        this.searchSelect = ''
      }
      this.initTableApi(this.searchData, val)
    },
    // 筛选
    screen() {
      this.currentPage = 1
      this.slectInputData = { [this.searchSelect]: this.searchValue }
      this.searchData = { ...this.slectInputData, ...this.searchItem }
      this.initTableApi(this.searchData)
    },
    // 清除筛选
    clearScreen() {
      this.searchData = {}
      this.slectInputData = {}
      this.searchSelect = ''
      this.searchValue = ''
      this.searchItem = {}
      this.searchItem.date = []
      this.currentPage = 1
      this.initTableApi(this.searchData)
    },
    // 接触禁用状态
    deldisabled() {
      console.log(1)
      if (this.multipleSelection.length == 0) {
        this.$message.error('选择要解除禁用的账户')
        return
      }
      let deletIdArr = this.multipleSelection.map(item => {
        return item.id
      })
      let stringdelet = deletIdArr.join(',')
      this.$http({
        method: 'PATCH',
        url: `/user/disabled`,
        params: {
          ids: stringdelet,
          disabled: '0'
        }
      }).then(res => {
        if (res.code == 200) {
          this.$message({
            type: 'success',
            message: res.message
          })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 禁用选中项
    disabled() {
      if (this.multipleSelection.length == 0) {
        this.$message.error('选择要禁用的账户')
        return
      }
      let deletIdArr = this.multipleSelection.map(item => {
        return item.id
      })
      let stringdelet = deletIdArr.join(',')
      this.$http({
        method: 'PATCH',
        url: `/user/disabled`,
        params: {
          ids: stringdelet,
          disabled: '1'
        }
      }).then(res => {
        if (res.code == 200) {
          this.$message({
            type: 'success',
            message: res.message
          })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 编辑表单提交
    Editconfirm(row) {
      this.$http({
        method: 'put',
        url: `/user${this.id ? '/' + this.id : ''}`,
        params: { ...this.ruleForm }
      }).then(res => {
        if (res.code == 200) {
          this.dialogFormVisible = false
          this.$message({ type: 'success', message: res.message })
          this.initPage()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 单个禁用
    editTableFun(row) {
      this.$http({ method: 'get', url: `/user/read${row.id ? '/' + row.id : ''}` }).then(res => {
        if (res.code == 200) {
          this.dialogFormVisible = true
          this.ruleForm.nickname = res.data.nickname
          this.ruleForm.phone = res.data.phone
          this.ruleForm.icon = res.data.icon
          this.ruleForm.is_disabled = res.data.is_disabled.toString()
          this.id = row.id
        } else {
          this.$message.error(res.message)
        }
      })
    },
    formatter(row, column, cellValue) {
      Object.keys(row).forEach(item => {
        if (row[item] == '' || isNull(row[item])) {
          row[item] = '空'
        }
      })
      return cellValue
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    edit() {
      this.dialogFormVisible = true
    },
    toBillDetail(row) {
      this.$router.push({ name: 'BillDetail', params: { account: row.account, id: row.id, nickname: row.nickname } })
    },
    initTableApi(params, page = this.currentPage) {
      this.$http({ method: 'get', url: `/user/lists${page ? '/' + page : ''}`, params: { ...params } }).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.list
          this.total = res.data.total
        }
      })
    },
    async initPage() {
      await this.initTableApi()
    }
  },
  mounted() {
    this.initPage()
  },
  components: {
    Breadcrumb,
    Pic,
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
  .tableTitle {
    justify-content: space-between;
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

.headerButtonGroup {
  text-align: right;
}

.jueseName {
  max-width: 500px;
}
</style>

<style>
.searchContainer .searchInput .el-input-group__prepend {
  background: #fff;
}

.jueseName .el-select {
  width: 100%;
}
</style>


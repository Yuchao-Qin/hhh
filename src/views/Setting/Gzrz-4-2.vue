<template>
  <!-- 工作日志 -->
  <div class="page">
    <!-- 面包屑 -->
    <Breadcrumb :crumData="crumData"></Breadcrumb>
    <!-- 账户管理 -->
    <!-- @Datepicker="searchItem.DateP = $event" -->
    <div class="tableContainer">
      <div :gutter="3" class="tableTitle">
        <span class="fl margin10" :span="6">
          <DatePicker :pic.sync="searchItem.DateP"></DatePicker>
        </span>
        <span class="fl" :span="6">
          <el-input size="mini" placeholder="请输入关键字"
            v-model="searchItem.keyword" class="searchInput">
          </el-input>
        </span>
        <span class="fr" :span="8">
          <el-button type="primary" size="mini" @click="search">筛选</el-button>
          <el-button size="mini" type="primary" @click="searchAll">清除筛选
          </el-button>
        </span>
      </div>
      <el-table size="mini" max-height="550" :data="tableData" border stripe
        style="width: 100%">
        <el-table-column prop="add_time" label="操作日期">
        </el-table-column>
        <el-table-column prop="admin_name" label="用户">
        </el-table-column>
        <el-table-column prop="message" label="操作">
        </el-table-column>
        <el-table-column prop="ip" label="来源IP">
        </el-table-column>

      </el-table>

      <el-dialog width="30%" title="新增用户" :visible.sync="dialogFormVisible">
        <el-form :model="ruleForm" status-icon ref="ruleForm"
          label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户" prop="nickName">
            <el-input v-model="ruleForm.account" size="small"
              autocomplete="off">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm('ruleForm')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 分页 -->
      <el-pagination v-if="total > 10" class="pagination" background
        layout="prev, pager, next" @current-change="handleCurrentChange"
        :current-page.sync="currentPage" :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
import DatePicker from '@/components/DatePicker.vue'
import Test from '@/components/test.vue'
import { isNull } from 'util'

export default {
  data() {
    return {
      num: '1',
      pic: '',
      dialogFormVisible: false,
      searchScreen: false,
      ruleForm: {
        account: ''
      },
      crumData: {
        breadItem: [{ name: '设置' }, { name: '工作日志' }],
        leadingIn: false,
        leadingOut: false
      },
      tableData: [],
      value1: '',
      value2: '',
      searchValue: '',
      total: '',
      currentPage: 0,
      DateP: '',
      searchItem: {
        DateP: [],
        keyword: ''
      },
      searchItemData: {},
      searchData: {}
    }
  },
  methods: {
    newAccount() {},
    async tableListData(params = {}) {
      let res = await this.$http.get('/workJob/workJob', { params: { ...params } })
      return res
    },
    // 分页
    handleCurrentChange(val) {
      // this.searchItem.DateP = null
      // this.searchItem.keyword = ''
      console.log(isNull)
      let DateArr
      console.log(this.searchData.date_start)
      console.log(this.searchData.date_start === '')
      if ((!this.searchData.date_start)) {
        DateArr = null
      } else {
        DateArr = [this.searchData.date_start, this.searchData.date_end]
      }

      this.searchItem.DateP = DateArr
      this.searchItem.keyword = this.searchData.keyword
      this.searchData.page = val
      this.tableListData(this.searchData).then(res => {
        this.currentPage = val
        this.tableData = res.data.list
      })
    },
    // 筛选
    search() {
      if (isNull(this.searchItem.DateP)) this.searchItem.DateP = []

      this.searchScreen = true
      let {
        DateP: [date_start = '', date_end = ''],
        keyword = ''
      } = this.searchItem

      this.searchData = { date_start, date_end, keyword }

      this.tableListData(this.searchData).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.list
          this.total = res.data.pagination.total
          this.currentPage = 1
        }
      })
    },
    // 查看全部
    searchAll() {
      this.searchItem.DateP = null
      this.searchItem.keyword = ''
      this.search()
    }
  },
  mounted() {
    this.tableListData().then(res => {
      if (res.code == 200) {
        this.tableData = res.data.list
        this.total = res.data.pagination.total
      }
    })
  },
  components: {
    Breadcrumb,
    DatePicker,
    Test
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
    // display: flex;
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

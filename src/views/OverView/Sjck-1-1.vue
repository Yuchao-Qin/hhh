<template>
  <!-- 工作日志 -->
  <div class="page">
    <!-- 面包屑 -->
    <Breadcrumb :crumData="crumData"></Breadcrumb>
    <!-- 整体数据 -->
    <div class="moudleDataContainer">
      <el-row>
        <el-col class="moudleTitle" :span="24">
          <h3>整体数据</h3>
        </el-col>
      </el-row>
      <el-row class="moudleContent">
        <el-col class="moudleDate" :span="6">
          <div>注册总人数</div>
          <div>{{initData.reg_users}}</div>
        </el-col>
        <el-col class="moudleDate" :span="6">
          <div>激活总人数</div>
          <div>{{initData.total_people}}</div>
        </el-col>
        <el-col class="moudleDate" :span="6">
          <div>累计激活金额</div>
          <div>{{initData.total_amount}}</div>
        </el-col>
        <el-col class="moudleDate" :span="6">
          <div>累计消费金额</div>
          <div>{{initData.grand_amount}}</div>
        </el-col>
      </el-row>
    </div>

    <el-divider class="line" content-position="left">以上数据截止于前一日</el-divider>
    <!-- 账户管理 -->
    <div class="tableContainer">
      <el-row>
        <el-col class="moudleTitle" :span="24">
          <h3>每日数据</h3>
        </el-col>
      </el-row>
      <div :gutter="10" class="tableTitle">
        <span :span="6">
          <DatePicker :pic.sync="searchItem.date"></DatePicker>
        </span>
        <span :span="10">
          <el-button class="allSerch" size="mini" type="primary" @click="screen">筛选
          </el-button>
          <el-button class="allSerch" size="mini" type="primary" @click="clearScreen">清空筛选
          </el-button>
        </span>
      </div>
      <el-table :data="tableData" max-height="200" border stripe style="width: 100%">
        <el-table-column prop="record_time" :formatter="formatDate" label="日期">
        </el-table-column>
        <el-table-column prop="register_count" label="新用户人数">
        </el-table-column>
        <el-table-column prop="activation_users" label="当日激活卡人数">
        </el-table-column>
        <el-table-column prop="activation_amount" label="当日激活金额">
        </el-table-column>
        <el-table-column prop="consume_amount" label="当日消费金额">
        </el-table-column>
        <el-table-column prop="visit_users" label="当日访问人数">
        </el-table-column>
        <el-table-column prop="visit_times" label="当日访问次数">
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination class="pagination" background layout="prev, pager, next"
        @current-change="handleCurrentChange" :current-page.sync="currentPage"
        :total="total">
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
      currentPage:0,
      searchItem: {
        date:[]
      },
      searchData:{},
      crumData: {
        breadItem: [{ name: '数据查看' }, { name: '数据查看' }],
        leadingIn: false,
        leadingOut: false
      },
      tableData: [],
      value1: '',
      value2: '',
      searchValue: '',
      initData: '',
      total: 0
    }
  },
  mounted() {},
  methods: {
    screen() {
      this.initPageAPI()
    },
    formatDate(row, column) {
      let date = new Date(parseInt(row.record_time) * 1000)
      let Y = date.getFullYear() + '-'
      let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-'
      let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
      let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':'
      let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
      let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return Y + M + D + h + m + s
    },
    handleCurrentChange(val) {
      this.searchItem = {...this.searchData}
      let data = {...this.searchData}
      data.page = val
      this.initPageAPI(data);
    },
    screen(){
      this.currentPage = 1
      this.searchData = {...this.searchItem}
      this.initPageAPI(this.searchData)
    },
    // 清空筛选
    clearScreen() {
      this.currentPage = 1
      this.searchItem.date = []
      this.searchData = {}
      this.initPageAPI(this.searchData)
    },
    initPageAPI(params) {
      this.$http({
        method: 'get',
        url: '/overall/overallData',
        params: { ...params }
      }).then(res => {
        if (res.code == 200) {
          this.initData = res.data.list
          this.tableData = this.initData.daily_data.data
          this.total = this.initData.daily_data.total
        }
      })
    },
    async initPage() {
      await this.initPageAPI()
    }
  },
  mounted() {
    this.initPage()
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
  padding: 0 15px;
  .tableTitle {
    text-align: left;
    display: flex;
    padding: 10px 0;
    margin-bottom: 20px;
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
  width: 90%;
}

.moudleTitle {
  padding: 10px;
}

.moudleDate {
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-right: 1px solid #e1e1e1;
}

.el-divider {
  background-color: #ffa07a;
  .el-divider__text {
    color: #ff3030;
  }
}

.moudleDate {
  margin-bottom: 20px;
}

.allSerch {
  margin-left: 16px;
}
</style>



<template>
  <!-- 用户管理 -->
  <div class="page">
    <!-- 面包屑 -->
    <Breadcrumb :crumData="crumData" @downLoad="downLoad"></Breadcrumb>
    <!-- tab -->
    <div class="headGroup">
      <el-radio-group v-model="radio1" size="mini">
        <el-radio-button label="优惠卡列表"></el-radio-button>
        <el-radio-button label="优惠卡生成记录"></el-radio-button>
      </el-radio-group>
    </div>
    <!-- 优惠卡列表 -->
    <div v-show="radio1 == '优惠卡列表'" class="tableContainer">
      <div class="tableTitle">
        <span :span="6" class="calendarContainer fl margin10">
          <span class="ji_huo_Time">生成时间：</span>
          <el-date-picker value-format="yyyy-MM-dd" size="mini"
            v-model="CardsearchItem.add_time" type="daterange" class="calendar"
            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </span>
        <span :span="6" class="calendarContainer fl margin10">
          <span class="ji_huo_Time">激活时间：</span>
          <el-date-picker size="mini" v-model="CardsearchItem.use_time"
            value-format="yyyy-MM-dd" type="daterange" class="calendar"
            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </span>
        <span :span="6" class="searchContainer fl margin10">
          <el-input size="mini" placeholder="请输入内容"
            v-model="CardsearchItem.keyword_input" class="searchInput">
            <el-select v-model="CardsearchItem.keyword" slot="prepend"
              class="searchSelect" placeholder="请选择">
              <el-option label="激活用户ID" value="userid"></el-option>
              <el-option label="商家ID" value="bid"></el-option>
              <el-option label="卡密" value="secret"></el-option>
            </el-select>
          </el-input>
        </span>
        <span :span="6" class="searchContainer fl margin10">
          <div class="headerSelect">
            <el-select v-model="CardsearchItem.status" class="searchSelect"
              size="mini" placeholder="激活状态">
              <el-option label="已激活" value="activated"></el-option>
              <el-option label="未激活" value="inactivated"></el-option>
            </el-select>
          </div>
        </span>
        <span :span="8" class="fr">
          <el-button size="mini" type="primary" @click="CardScreen">筛选
          </el-button>
          <el-button size="mini" type="primary" @click="clearCardScreen">清除筛选
          </el-button>
          <!-- <el-button size="mini" type="primary">导出</el-button> -->
        </span>
        <!-- </div> -->
      </div>
      <el-table ref="multipleTable" @selection-change="handleSelectionTable2"
        :data="tableData" border stripe style="width: 100%">
        <el-table-column type="index" label="编号" width="55">
        </el-table-column>
        <el-table-column prop="amount" label="卡金额">
        </el-table-column>
        <el-table-column prop="bid" label="所属商家ID">
        </el-table-column>
        <el-table-column prop="secret" label="卡密">
        </el-table-column>
        <el-table-column prop="use_time" :formatter="formatDate" label="激活卡时间">
        </el-table-column>
        <el-table-column prop="userid" label="激活用户ID">
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination class="pagination" background layout="prev, pager, next"
        @current-change="handleCurrentChange1" :current-page.sync="currentPage1"
        :total="total1">
      </el-pagination>
    </div>
    <!-- 优惠卡生成记录 -->
    <div v-show="radio1 == '优惠卡生成记录'" class="tableContainer">
      <div class="tableTitle">
        <span :span="6" class="calendarContainer fl margin10">
          <span class="ji_huo_Time">生成时间：</span>
          <el-date-picker size="mini" v-model="CardLogsearchItem.create_time"
            value-format="timestamp" type="daterange" class="calendar"
            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </span>
        <span :span="6" class="searchContainer fl margin10">
          <el-input size="mini" placeholder="请输入内容"
            v-model="CardLogsearchItem.keyword_input" class="searchInput">
            <el-select v-model="CardLogsearchItem.keyword" slot="prepend"
              class="searchSelect" placeholder="请选择">
              <el-option label="商家ID" value="bid"></el-option>
              <el-option label="操作员" value="created_user"></el-option>
            </el-select>
          </el-input>
        </span>
        <span :span="8" class="fr">
          <el-button size="mini" type="primary" @click="logCardscreen">筛选
          </el-button>
          <el-button size="mini" type="primary" @click="clearCardscreen">清除筛选
          </el-button>
          <!-- <el-button size="mini" type="primary" @click="screen">导出</el-button> -->
        </span>
        <!-- </div> -->
      </div>
      <el-table ref="multipleTable" @selection-change="handleSelectionTable2"
        :data="LogtableData" border stripe style="width: 100%">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="create_time" :formatter="formatDate"
          label="生成时间">
        </el-table-column>
        <el-table-column prop="bid" label="商家ID">
        </el-table-column>
        <el-table-column prop="shop_name" label="商家名称">
        </el-table-column>
        <el-table-column prop="amount" label="生成总金额">
        </el-table-column>
        <el-table-column prop="price" label="单张卡金额">
        </el-table-column>
        <el-table-column prop="total" label="优惠卡数量">
        </el-table-column>
        <!-- <el-table-column prop="create_time" label="优惠卡生成时间">
        </el-table-column> -->
        <el-table-column prop="admin_name" label="操作员">
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination class="pagination" background layout="prev, pager, next"
        @current-change="handleCurrentChange2" :current-page.sync="currentPage2"
        :total="total2">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
import Array from 'util'
export default {
  data() {
    return {
      CardSearchData: {},
      CardsearchItem: {
        add_time: [],
        use_time: [],
        keyword: '',
        keyword_input: '',
        status: ''
      },
      CardLogsearchItem: {
        create_time: [],
        keyword_input: null,
        keyword: null
      },
      currentPage1: 1,
      currentPage2: 1,
      total1: 1,
      total2: 1,
      radio1: '优惠卡列表',
      checked: '',
      dialogFormVisible: false,
      dialogTableVisible: false,
      activeNames: '',
      crumData: {
        breadItem: [{ name: '优惠卡列表' }, { name: '优惠卡生成记录' }],
        leadingIn: false,
        leadingOut: true
      },
      tableData: [],
      LogtableData: [],
      value1: '',
      value2: '',
      searchValue: '',
      searchSelect: '1',
      multipleSelection: [],
      ruleForm: {
        nickName: '',
        phoneNumber: '',
        bangding: ''
      },
      CardLogsearchData: {},
      multipleSelection1:[],
      multipleSelection2:[]
    }
  },
  watch: {
    radio1(newValue) {
      this.crumData.breadItem.splice(this.crumData.breadItem.length - 1, 1, { name: newValue })
    }
  },
  methods: {
        // 选中项数据
    handleSelectionTable1(val) {
      this.multipleSelection1 = val
    },
        // 选中项数据
    handleSelectionTable2(val) {
      this.multipleSelection2 = val
    },
    downLoad() {
      // if (!isNull(this.slectInputData)) {
      //   this.searchItem.searchSelect = Object.keys(this.slectInputData)[0]
      //   this.searchItem.searchValue = this.slectInputData[this.searchItem.searchSelect]
      // } else {
      //   this.searchItem.searchSelect = ''
      //   this.searchItem.searchValue = ''
      // }
      let url
      if (this.radio1 == '优惠卡列表') {
        url = '/card/cardExport'
      } else {
        url = '/card/cardLogExport'
      }
      this.$http({ method: 'get', url: url, params: this.searchData }).then(res => {
        if (res) {
          this.download(res.request.responseURL)
        }
      })
    },
    download(responseUrl) {
      if (!responseUrl) {
        return
      }
      let url = responseUrl
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url

      document.body.appendChild(link)
      link.click()
    },
    // 优惠卡列表筛选
    CardScreen() {
      let {
        add_time: [add_time_1 = '', add_time_2 = ''] = [],
        use_time: [use_time_1 = '', use_time_2 = ''] = [],
        keyword,
        keyword_input,
        status
      } = this.CardsearchItem
      this.CardSearchData = { add_time_1, add_time_2, use_time_1, use_time_2, keyword, keyword_input, status }
      this.CardApi(this.CardSearchData)
    },
    newAccount() {},
    // 优惠卡列表分页
    handleCurrentChange1(val) {
      this.CardsearchItem.add_time = this.CardSearchData.add_time_1
        ? [this.CardSearchData.add_time_1, this.CardSearchData.add_time_2]
        : []
      this.CardsearchItem.use_time = this.CardSearchData.use_time_1
        ? [this.CardSearchData.use_time_1, this.CardSearchData.use_time_2]
        : []
      this.CardsearchItem.keyword = this.CardSearchData.keyword
      this.CardsearchItem.keyword_input = this.CardSearchData.keyword_input
      this.CardsearchItem.status = this.CardSearchData.status
      let data = this.CardSearchData
      data.page = val
      this.CardApi(data)
    },
    handleCurrentChange2(val) {
      this.CardLogsearchItem = { ...this.CardLogsearchData }
      let data = { ...this.CardLogsearchData }
      data.page = val
      this.CardLogApi(data)
    },
    logCardscreen() {
      this.currentPage2 = 1
      this.CardLogsearchData = { ...this.CardLogsearchItem }
      this.CardLogApi(this.CardLogsearchData)
    },
    clearCardscreen() {
      this.currentPage2 = 1
      this.CardLogsearchData = {}
      Object.keys(this.CardLogsearchItem).forEach(item => {
        if (Array.isArray(this.CardLogsearchItem[item])) {
          this.CardLogsearchItem[item] = []
        } else {
          this.CardLogsearchItem[item] = ''
        }
      })
      this.CardLogApi(this.CardLogsearchData)
    },
    clearCardScreen() {
      this.currentPage1 = 1
      Object.keys(this.CardsearchItem).forEach(item => {
        if (Array.isArray(this.CardsearchItem[item])) {
          this.CardsearchItem[item] = []
        } else {
          this.CardsearchItem[item] = ''
        }
      })
      this.CardSearchData = {}
      this.CardApi(this.CardSearchData)
    },
    
    formatDate(row, column) {
      let date
      if (row.create_time) {
        date = new Date(parseInt(row.create_time) * 1000)
      } else if (row.add_time) {
        date = new Date(parseInt(row.add_time) * 1000)
      } else if (row.use_time) {
        date = new Date(parseInt(row.use_time) * 1000)
      }
      let Y = date.getFullYear() + '-'
      let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-'
      let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
      let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':'
      let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
      let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return Y + M + D + h + m + s
    },
    // handleSelectionChange(val) {
    //   this.multipleSelection = val
    // },
    CardApi(params) {
      this.$http({ method: 'get', url: '/card/cardShow', params: { ...params } }).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.list.data
          this.total1 = res.data.list.total
          return res
        }
      })
    },
    CardLogApi(params) {
      this.$http({ method: 'get', url: '/card/cardLog', params: { ...params } }).then(res => {
        if (res.code == 200) {
          this.LogtableData = res.data.list.data
          this.total2 = res.data.list.total
          return res
        }
      })
    },


    async initPage() {
      await this.CardApi()
      await this.CardLogApi()
    }
  },
  mounted() {
    this.initPage()
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
}

.tableContainer {
  text-align: left;
  padding: 0 15px;
  .tableTitle {
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

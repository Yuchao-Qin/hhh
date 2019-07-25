<template>
  <div class="page">
    <!-- 面包屑 -->
    <Breadcrumb :crumData="crumData"></Breadcrumb>
    <!-- tab -->
    <h3 class="title">账单详情</h3>
    <!-- <div class="headGroup">
      <DatePicker @Datepicker="DateP = $event"></DatePicker>
      
    </div> -->
    <!-- 账户管理 -->
    <div class="tableContainer">
      <div :gutter="5" class="tableTitle">
        <span class="tableName fl margin10" :span="20">
          <span>用户ID：{{account}}</span><span>用户昵称：{{nickname}}</span></span>
        <span class="tableName fl margin10">
          <DatePicker :pic.sync="searchItem.date"></DatePicker>
        </span>
        <span class="tableName fl margin10">
          <el-select v-model="searchItem.type" size="mini" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value"
              :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </span>
        <span class="fr">
          <el-button size="mini" type="primary" @click="screen">筛选</el-button>
          <el-button size="mini" type="primary" @click="clearScreen">清除筛选
          </el-button>
        </span>
      </div>
      <el-table size="mini" max-height="550" :data="tableData" border stripe
        style="width: 100%">
        <el-table-column prop="add_time" label="时间">
        </el-table-column>
        <el-table-column prop="cost" label="金额">
        </el-table-column>
        <el-table-column prop="name" label="记录">
          <template slot-scope="scope">
            {{scope.row.type == 1?'消费':'充值'}}
          </template>
        </el-table-column>
        <el-table-column prop="purpose" label="来源/去处">
        </el-table-column>
        <!-- <el-table-column prop="phoneNumber" label="去处">
        </el-table-column> -->
        <el-table-column prop="staus" label="卡密">
          <template slot-scope="scope">
            {{scope.row.type==2?scope.row.secret:'空'}}
          </template>
        </el-table-column>
        <el-table-column prop="link" label="优惠券链接">
          <template slot-scope="scope">
            {{scope.row.type==1?scope.row.link:'空'}}
          </template>
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
      currentPage: 1,
      total: 0,
      searchItem: {
        date: []
      },
      searchData: {},
      account: this.$route.params.account,
      nickname: this.$route.params.nickname,
      id: this.$route.params.id,
      overView: [],
      management: [],
      content: [],
      setting: [],
      jueSeName: '',
      chong_zhi: '',
      xiao_fei: '',
      crumData: {
        breadItem: [{ name: '设置' }, { name: '用户管理', bits: 'Yhgl-2-1' }, { name: '账单详情' }],
        leadingIn: false,
        leadingOut: false
      },
      tableData: [],
      options: [
        {
          value: '2',
          label: '充值'
        },
        {
          value: '1',
          label: '消费'
        }
      ],
      tableSelectValue: ''
    }
  },
  watch: {},
  methods: {
    // 分页
    handleCurrentChange(val) {
      this.searchItem = { ...this.searchData }
      this.TableListAPI(this.searchData,val)
    },
    // 筛选
    screen() {
      this.currentPage = 1
      this.searchData = { ...this.searchItem }
      this.TableListAPI(this.searchData)
    },
    // 清除筛选
    clearScreen() {
      this.currentPage = 1
      this.searchItem = {}
      this.searchData = {}
      this.searchItem.date = []
      this.TableListAPI(this.searchData)
    },
    confirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
          this.dialogFormVisible = false
        } else {
          console.log('error submit!!')
          return false
          this.dialogFormVisible = true
        }
      })
    },
    // 表单列表
    TableListAPI(params, page = this.currentPage) {
      this.$http({
        method: 'get',
        url: `/user/order${page ? '/' + page : ''}`,
        params: { user_id: this.id, ...params }
      }).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.list
          this.total = res.data.total
        }
      })
    },
    async initPage() {
      await this.TableListAPI()
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
  padding: 0 15px;
}

.tableContainer {
  padding: 0 15px;
  .tableTitle {
    padding: 10px;
  }
}

.tableName {
  font-weight: bold;
  align-self: flex-end;
  text-align: left;
  span {
    margin-right: 20px;
  }
}
.addAccount {
  text-align: left;
}
.delet {
  color: red;
}

.el-select {
  width: 100%;
}

.el-checkbox-group {
  text-align: left;
}

.jueseName {
  width: 40%;
  text-align: left;
}

h3 {
  margin: 10px 0;
}
</style>
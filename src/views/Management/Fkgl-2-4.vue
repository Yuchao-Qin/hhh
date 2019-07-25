<template>
  <!-- 反馈管理 -->
  <div class="page">
    <!-- 面包屑 -->
    <Breadcrumb :crumData="crumData"></Breadcrumb>
    <!-- 账户管理 -->
    <div class="tableContainer">
      <div :gutter="3" class="tableTitle">
        <span :span="6" class="calendarContainer fl margin10">
          <DatePicker :pic.sync="searchItem.add_time"></DatePicker>
        </span>
        <span :span="12" class="searchContainer fl margin10">
          <el-input size="mini" placeholder="请输入内容"
            v-model="searchItem.keyword_input" class="searchInput">
            <el-select v-model="searchItem.keyword" slot="prepend"
              class="searchSelect" placeholder="请选择">
              <el-option label="用户ID" value="user_id"></el-option>
              <el-option label="联系方式" value="phone"></el-option>
            </el-select>
          </el-input>
        </span>
        <span class="fl margin10">
          <el-select v-model="searchItem.problem" size="mini"
            placeholder="反馈状态">
            <el-option label="问题" value="问题">
            </el-option>
            <el-option label="建议" value="建议">
            </el-option>
          </el-select>
        </span>
        <span class="fl margin10">
          <el-select v-model="searchItem.status" size="mini"
            placeholder="处理状态">
            <el-option label="已处理" key="1" value="1">
            </el-option>
            <el-option label="未处理" key="0" value="0">
            </el-option>
          </el-select>
        </span>
        <span :span="8" class="fr">
          <el-button size="mini" type="primary" @click="screen">筛选</el-button>
          <el-button size="mini" type="primary" @click="ClearScreen">清除筛选
          </el-button>
        </span>
      </div>
      <el-table ref="multipleTable" size="mini" max-height="550"
        :data="tableData" border stripe style="width: 100%">
        <el-table-column prop="problem" class-name="selectTableHeader"
          label="反馈状态" width="200px">
        </el-table-column>
        <el-table-column prop="user_id" label="发送用户ID">
        </el-table-column>
        <el-table-column prop="add_time" label="反馈时间">
        </el-table-column>
        <el-table-column prop="description" label="描述">
        </el-table-column>
        <el-table-column prop="phone" width="100" label="联系方式">
        </el-table-column>
        <el-table-column prop="character" class-name="selectTableHeader"
          label="处理状态" width="200px">
          <template slot-scope="scope">
            {{scope.row.status == 0?'未处理':'已处理'}}
          </template>
        </el-table-column>
        <el-table-column prop="operating" label="图片">
          <template slot-scope="scope">
            <el-button type="text" size="small"
              @click="fankui_picture(scope.row)">
              反馈图片</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination class="pagination" background layout="prev, pager, next"
        @current-change="handleCurrentChange" :current-page.sync="currentPage"
        :total="total">
      </el-pagination>
    </div>

    <!-- 反馈图片模态框 -->
    <el-dialog width="30%" title="添加商家" :visible.sync="dialogFormVisible">
      <div v-if="this.photo.length !== 0" class="picture_container">
        <a :href="item.path" target="_blank" v-for="(item, index) in photo"
          :key="index" rel="noopener noreferrer">
          <el-image :src="item.path"
            style="width: 100px; height: 100px; margin-left:10px" fit="fill">
          </el-image>
        </a>
      </div>
      <div v-else class="picture_container">
        <div>暂无数据</div>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
import DatePicker from '@/components/DatePicker.vue'
import Array from 'util'
export default {
  data() {
    return {
      currentPage: 1,
      total: 0,
      photo: [],
      searchItem: {
        add_time: [],
        // user_id: '',
        // phone: '',
        problem: '',
        status: ''
      },
      dialogFormVisible: false,
      dialogCardVisible: false,
      dialogBatchCard: false,
      tableTestshow: true,
      tabtest: true,
      radio1: '账户管理',
      tableSelectValue: '',
      crumData: {
        breadItem: [{ name: '管理' }, { name: '反馈管理' }],
        leadingIn: false,
        leadingOut: false
      },
      tableData: [],
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
      fan_kui_status: '',
      searchData:{}
    }
  },
  watch: {
    radio1(newValue) {
      this.crumData = [{ name: '设置' }, { name: '账户权限' }, { name: newValue }]
    }
  },
  methods: {
    newAccount() {},
    handleCurrentChange(val) {
      this.searchItem = {...this.searchData}
      let data = { ...this.searchData }
      data.page = val
      this.tableListAPI(data)
    },
    fankui_picture(row) {
      this.dialogFormVisible = true
      this.photo = row.photo
    },
    // 筛选
    screen() {
      this.currentPage = 1
      this.searchData = {...this.searchItem}
      let data = {...this.searchData}
      data.page = 1
      this.tableListAPI(data)
    },
    // 清除筛选
    ClearScreen() {
      this.currentPage = 1
      Object.keys(this.searchItem).forEach(item => {
        if (Array.isArray(this.searchItem[item])) {
          this.searchItem[item] = []
        }
        this.searchItem[item] = ''
        this.searchData = {}
        this.tableListAPI(this.searchItem)
      })
    },
    tableListAPI(params = {}) {
      this.$http({
        method: 'get',
        url: '/feedback/feedbackShow',
        params: {
          ...params
        }
      }).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.data
          this.total = res.data.total
        }
      })
    },
    async initPage() {
      await this.tableListAPI()
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
  text-align: left;
  padding: 0 15px;
  position: relative;
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


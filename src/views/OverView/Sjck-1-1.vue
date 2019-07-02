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
          <div>10000</div>
        </el-col>
        <el-col class="moudleDate" :span="6">
          <div>激活总人数</div>
          <div>10000</div>
        </el-col>
        <el-col class="moudleDate" :span="6">
          <div>累计激活金额</div>
          <div>10000</div>
        </el-col>
        <el-col class="moudleDate" :span="6">
          <div>累计消费金额</div>
          <div>10000</div>
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
          <DatePicker @Datepicker="DateP = $event"></DatePicker>
        </span>
        <span :span="10">
          <el-button class="allSerch" size="mini" type="primary">查看全部
          </el-button>
        </span>
      </div>
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column prop="Date" label="日期">
        </el-table-column>
        <el-table-column prop="newUser" label="新用户人数">
        </el-table-column>
        <el-table-column prop="ActivationCard" label="当日激活卡人数">
        </el-table-column>
        <el-table-column prop="ActivationAmount" label="当日激活金额">
        </el-table-column>
        <el-table-column prop="ConsumeAmount" label="当日消费金额">
        </el-table-column>
        <el-table-column prop="numberPeople" label="当日访问人数">
        </el-table-column>
        <el-table-column prop="activeFrequency" label="当日访问次数">
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination class="pagination" background layout="prev, pager, next"
        :pager-count='17' :total="1000">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
import request from '@/utils/request.js'
import DatePicker from '@/components/DatePicker.vue'
export default {
  data() {
    return {
      crumData: {
        breadItem: [{ name: '数据查看' }, { name: '数据查看' }],
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
      searchValue: ''
    }
  },
  mounted() {
    const url = this.$route.name
  },
  methods: {
    newAccount() {},
    search() {
      request({
        url: 'post/accesstoken',
        method: 'post',
        params: { accesstoken: '413e3ed3-56c5-469a-ab6d-3b8f6a704ec2' }
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



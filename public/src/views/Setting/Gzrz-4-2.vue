<template>
  <!-- 工作日志 -->
  <div class="page">
    <!-- 面包屑 -->
    <Breadcrumb :crumData="crumData"></Breadcrumb>
    <!-- 账户管理 -->
    <div class="tableContainer">
      <el-row :gutter="3" class="tableTitle">
        <el-col :span="6">
          <el-date-picker size="mini" v-model="value1" type="daterange" class="calendar"
            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-col>
        <el-col :span="6">
          <el-input size="mini" placeholder="请输入内容" v-model="searchValue" class="searchInput">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-button size="mini" type="primary">查看全部</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column prop="accountNumber" label="操作日期">
        </el-table-column>
        <el-table-column prop="character" label="用户">
        </el-table-column>
        <el-table-column prop="operating" label="操作">
          <el-button type="text" size="small" class="delet">删除</el-button>
          <el-button type="text" size="small">修改</el-button>
        </el-table-column>
        <el-table-column prop="FromIp" label="来源IP">
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
export default {
  data() {
    return {
      radio1: '账户管理',
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
      value1: '',
      value2: '',
      searchValue: ''
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
  text-align:left;
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
  width: 90%;
}
</style>

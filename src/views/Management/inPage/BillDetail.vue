<template>
  <div class="page">
    <!-- 面包屑 -->
    <Breadcrumb :crumData="crumData"></Breadcrumb>
    <!-- tab -->
    <div class="headGroup">
      <!-- <el-radio-group v-model="radio1" size="small">
        <el-radio-button label="账户管理"></el-radio-button>
        <el-radio-button label="权限管理"></el-radio-button>
      </el-radio-group> -->
      <DatePicker></DatePicker>
    </div>
    <!-- 账户管理 -->
    <div class="tableContainer">
      <el-row :gutter="5" class="tableTitle">
        <el-col class="tableName" :span="20"><span>用户ID：xxxxxxxxxx</span><span>用户昵称：xxxxxxxx</span></el-col>
        <el-col class="addAccount" :span="4">
          <el-button size="small" type="primary" @click="dialogFormVisible = true">+
            新增用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column prop="accountNumber" label="时间">
        </el-table-column>
        <el-table-column prop="character" label="金额">
        </el-table-column>
        <el-table-column prop="name">
          <template slot="header" slot-scope="scope">
            <el-select v-model="value" size="mini" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="phoneNumber" label="来源/去处">
        </el-table-column>
        <el-table-column prop="staus" label="卡密">
        </el-table-column>
        <el-table-column prop="staus" label="优惠券链接">
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
import DatePicker from '@/components/DatePicker.vue'
export default {
  data() {
    return {
      radio1: '账户管理',
      overView: [],
      management: [],
      content: [],
      setting: [],
      jueSeName: '',
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
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: ''
    }
  },
  watch: {
    radio1(newValue) {
      this.crumData = [{ name: '设置' }, { name: '账户权限' }, { name: newValue }]
    }
  },
  methods: {
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

.breadcrumb-box {
  border: 1px solid #e1e1e1;
  padding: 20px;
  border-right: none;
  border-left: none;
}

.headGroup {
  padding-top: 20px;
}

.tableContainer {
  padding: 0 15px;
  flex: 1;
  position: relative;
  .tableTitle {
    display: flex;
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

.pagination {
  position: absolute;
  bottom: 75px;
  left: calc(50% - 505px);
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
</style>
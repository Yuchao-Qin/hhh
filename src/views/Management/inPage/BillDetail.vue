<template>
  <div class="page">
    <!-- 面包屑 -->
    <Breadcrumb :crumData="crumData"></Breadcrumb>
    <!-- tab -->
    <h3 class="title">账单详情</h3>
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
        <el-col class="tableName" :span="20">
          <span>用户ID：xxxxxxxxxx</span><span>用户昵称：xxxxxxxx</span></el-col>
      </el-row>
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column prop="accountNumber" label="时间">
        </el-table-column>
        <el-table-column prop="character" label="金额">
        </el-table-column>
        <el-table-column prop="name">
          <template slot="header" slot-scope="">
            <el-select v-model="tableSelectValue" size="mini" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value"
                :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="phoneNumber" v-if="chong_zhi" label="来源">
        </el-table-column>
        <el-table-column prop="phoneNumber" v-if="xiao_fei" label="去处">
        </el-table-column>
        <el-table-column prop="staus" v-if="chong_zhi" label="卡密">
        </el-table-column>
        <el-table-column prop="staus" v-if="xiao_fei" label="优惠券链接">
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
      overView: [],
      management: [],
      content: [],
      setting: [],
      jueSeName: '',
      chong_zhi: '',
      xiao_fei: '',
      crumData: {
        breadItem: [{ name: '设置' }, { name: '用户管理',bits:'Yhgl-2-1' }, { name: '账单详情' }],
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
      options: [
        {
          value: '全部记录',
          label: '全部记录'
        },
        {
          value: '充值',
          label: '充值'
        },
        {
          value: '消费',
          label: '消费'
        }
      ],
      tableSelectValue: '全部记录'
    }
  },
  watch: {
    radio1(newValue) {
      this.crumData = [{ name: '设置' }, { name: '账户权限' }, { name: newValue }]
    }
  },
  watch: {
    tableSelectValue(newValue) {
      if (newValue == '充值') {
        this.chong_zhi = true
        this.xiao_fei = false
      } else if (newValue == '消费') {
        this.xiao_fei = true
        this.chong_zhi = false
      } else {
        this.xiao_fei = true
        this.chong_zhi = true
      }
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

.headGroup {
  padding: 0 15px;
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

h3 {
  margin: 10px 0;
}
</style>
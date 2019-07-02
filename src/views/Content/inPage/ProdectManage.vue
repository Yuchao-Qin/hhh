<template>
  <!-- 工作日志 -->
  <div class="page">
    <!-- 面包屑 -->
    <Breadcrumb :crumData="crumData"></Breadcrumb>
    <h3 class="headGroup">
      专题A商品管理
    </h3>
    <!-- 账户管理 -->
    <div class="tableContainer">
      <div :gutter="3" class="tableTitle">
        <span :span="6">
          <el-button size="mini" type="primary">删除所有选项</el-button>
        </span>
      </div>
      <el-table size="mini" max-height="550" :data="tableData" border stripe style="width: 100%">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" width="50" label="序号">
        </el-table-column>
        <el-table-column prop="accountNumber" label="商品ID">
        </el-table-column>
        <el-table-column prop="character" label="商品名称">
        </el-table-column>
        <el-table-column prop="character" label="商品主图">
        </el-table-column>
        <el-table-column prop="character" label="商品详情页链接地址">
        </el-table-column>
        <el-table-column prop="character" label="商品一级类目">
        </el-table-column>
        <el-table-column prop="character" label="商品价格（元）">
        </el-table-column>
        <el-table-column prop="character" label="商品月销量">
        </el-table-column>
        <el-table-column prop="character" label="店铺名称">
        </el-table-column>
        <el-table-column prop="character" label="优惠券ID">
        </el-table-column>
        <el-table-column prop="character" label="优惠券剩余量">
        </el-table-column>
        <el-table-column prop="character" label="优惠券面额">
        </el-table-column>
        <el-table-column prop="character" label="优惠券开始时间">
        </el-table-column>
        <el-table-column prop="character" label="xxx">
        </el-table-column>
      </el-table>
      <!-- 添加专题模态框 -->
      <el-dialog width="40%" class="addSubjectTitle" title="添加专题"
        :visible.sync="addSubject">
        <el-form label-width="180px" :model="ruleForm" status-icon width="40%"
          class="demo-ruleForm">
          <el-form-item class="jueseName" label="专题类名">
            <el-input v-model="ruleForm.jueSeName" size="small"
              autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item class="jueseName" label="首页专题图片">
            <el-input v-model="ruleForm.jueSeName" size="small"
              autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item class="jueseName" label="专题详情页标题">
            <el-input v-model="ruleForm.jueSeName" size="small"
              autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item class="jueseName" label="专题详情页大图">
            <el-input v-model="ruleForm.jueSeName" size="small"
              autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item class="jueseName" label="专题详情页跳转商品ID">
            <el-input v-model="ruleForm.jueSeName" size="small"
              autocomplete="off">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogEditVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm('ruleForm')">确 定</el-button>
        </div>
      </el-dialog>
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
      addSubject: false,
      radio1: '账户管理',
      crumData: {
        breadItem: [{ name: '内容' }, { name: '专题管理',bits:'Ztgl-3-4' }, { name: '商品管理' }],
        leadingIn: false,
        leadingOut: true
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
      searchValue: '',
      ruleForm: {
        jueSeName: ''
      }
    }
  },
  watch: {
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

.headGroup {
  // text-align: left;
}

.tableContainer {
  text-align: left;
  padding: 0 15px;
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



.searchInput {
  width: 80%;
}

.calendar {
  width: 90%;
}

.hidetitle {
  color: red;
  font-size: 14px;
}

.jueseName {
  width: 60%;
}
</style>

<style>
.addSubjectTitle .el-dialog__header {
  text-align: center;
}
</style>
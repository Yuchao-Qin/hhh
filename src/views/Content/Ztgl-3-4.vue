<template>
  <!-- 工作日志 -->
  <div class="page">
    <!-- 面包屑 -->
    <Breadcrumb :crumData="crumData"></Breadcrumb>
    <!-- 账户管理 -->
    <div class="tableContainer">
      <div :gutter="3" class="tableTitle">
        <span :span="6">
          <span class="hidetitle">当前专题栏模块状态为--显示/隐藏</span>
           <el-button size="mini" type="primary">专题栏模块设为显示/隐藏</el-button>
        </span>
        <span :span="6">
         
        </span>
        <span :span="8">
          <el-button size="mini" type="primary" @click="addSubject=true">+添加专题
          </el-button>
        </span>
      </div>
      <el-table size="mini" max-height="550" :data="tableData" border stripe style="width: 100%">
        <el-table-column prop="accountNumber" label="专题类型名">
        </el-table-column>
        <el-table-column prop="character" label="首页专题图片">
        </el-table-column>
        <el-table-column prop="character" label="专题详情页标题">
        </el-table-column>
        <el-table-column prop="character" label="专题详情页大图">
        </el-table-column>
        <el-table-column prop="character" label="大图跳转商品ID">
        </el-table-column>
        <el-table-column prop="operating" label="操作">
          <el-button type="text" size="small" class="delet"
            @click="$router.push({name:'ProdectManage'})">商品管理</el-button>
          <el-button type="text" size="small"
            @click="subjectEditVisible = true">编辑</el-button>
        </el-table-column>
        <el-table-column prop="FromIp" label="来源IP">
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
      <!-- 编辑模态框 -->
      <el-dialog width="40%" class="addSubjectTitle" title="编辑"
        :visible.sync="subjectEditVisible">
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
      subjectEditVisible: false,
      radio1: '账户管理',
      crumData: {
        breadItem: [{ name: '设置' }, { name: '账户权限' }, { name: '账户管理' }],
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
      searchValue: '',
      ruleForm: {
        jueSeName: ''
      }
    }
  },
  watch: {
    radio1(newValue) {
      this.crumData = [{ name: '内容' }, { name: '专题管理' }]
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

.headGroup {
  padding-top: 20px;
  text-align: left;
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


.calendar {
  width: 90%;
}

.hidetitle {
  color: red;
  font-size: 14px;
  margin-right: 50px;
}

.jueseName {
  width: 60%;
}

.collapseItem {
  margin-right: 30px;
}
</style>

<style>
.addSubjectTitle .el-dialog__header {
  text-align: center;
}
</style>

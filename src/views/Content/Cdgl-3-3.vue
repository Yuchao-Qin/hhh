<template>
  <!-- 工作日志 -->
  <div class="page">
    <!-- 面包屑 -->
    <Breadcrumb :crumData="crumData"></Breadcrumb>
    <!-- 账户管理 -->
    <div class="tableContainer">
      <div :gutter="3" class="tableTitle">
        <span :span="6">
          <span class="hidetitle">当前菜单栏模块状态为--显示/隐藏</span>
          <el-button size="mini" type="primary">菜单栏模块设为显示/隐藏</el-button>
        </span>
        <span :span="8">
          <el-button size="mini" type="primary" @click="addSubject=true">+添加菜单
          </el-button>
        </span>
      </div>
      <el-table size="mini" max-height="550" :data="tableData" border stripe style="width: 100%">
        <el-table-column prop="accountNumber" type="index" width="50"
          label="排序">
        </el-table-column>
        <el-table-column prop="character" label="菜单名称">
        </el-table-column>
        <el-table-column prop="character" label="图标">
        </el-table-column>
        <el-table-column prop="character" label="专题详情页大图">
          <template slot="header" slot-scope="{}">
            <el-select v-model="shang_jia" size="mini" placeholder="是否上架">
              <el-option value="1" label="上架"></el-option>
              <el-option value="2" label="下架">下架</el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="character" label="菜单详情页分类标题">
        </el-table-column>
        <el-table-column prop="operating" label="操作">
          <el-button type="text" size="small" class="delet"
            @click="$router.push({name:'MenuManage'})">商品管理</el-button>
          <el-button type="text" size="small" @click="menuDialogVisible = true">
            编辑</el-button>
        </el-table-column>
        <el-table-column prop="FromIp" label="来源IP">
        </el-table-column>
      </el-table>
      <!-- 添加专题模态框 -->
      <el-dialog width="40%" class="addSubjectTitle" title="添加菜单"
        :visible.sync="addSubject">
        <el-form label-width="180px" :model="ruleForm" status-icon width="40%"
          class="demo-ruleForm">
          <el-form-item class="jueseName" label="菜单名称">
            <el-input v-model="ruleForm.jueSeName" size="small"
              autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item class="jueseName" label="排序">
            <el-input v-model="ruleForm.jueSeName" size="small"
              autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item class="jueseName" label="图标">
            <el-input v-model="ruleForm.jueSeName" size="small"
              autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item class="jueseName" label="菜单详情页分类标题">
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
        :visible.sync="menuDialogVisible">
        <el-form label-width="180px" :model="ruleForm" status-icon width="40%"
          class="demo-ruleForm">
          <el-form-item class="jueseName" label="菜单名称">
            <el-input v-model="ruleForm.jueSeName" size="small"
              autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item class="jueseName" label="排序">
            <el-input v-model="ruleForm.jueSeName" size="small"
              autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item class="jueseName" label="图标">
            <el-input v-model="ruleForm.jueSeName" size="small"
              autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item class="jueseName" label="是否上架">
            <el-select v-model="shang_jia" size="small" placeholder="是否上架">
              <el-option value="1" label="上架"></el-option>
              <el-option value="2" label="下架">下架</el-option>
            </el-select>
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
      menuDialogVisible: false,
      crumData: {
        breadItem: [{ name: '内容' }, { name: '菜单管理' }],
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
      shang_jia: '',
      ruleForm: {
        jueSeName: ''
      }
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

.headGroup {
  padding-top: 20px;
  text-align: left;
}

.tableContainer {
  text-align: left;
  padding: 0 15px;
  .tableTitle {
    display: flex;
    justify-content: space-between;
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
  margin-right:50px; 
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


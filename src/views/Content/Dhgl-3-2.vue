<template>
  <!-- 用户管理 -->
  <div class="page">
    <!-- 面包屑 -->
    <Breadcrumb :crumData="crumData" @downLoad="downLoad"
      :formData.sync="formData"></Breadcrumb>
    <!-- 账户管理 -->
    <div class="tableContainer">
      <div :gutter="3" class="tableTitle">
        <span :span="6" class="searchContainer fl">
          <el-input size="mini" placeholder="请输入内容" v-model="searchValue"
            class="searchInput">
            <el-select v-model="searchSelect" slot="prepend"
              class="searchSelect" placeholder="请选择">
              <el-option label="分类ID" value="class_id"></el-option>
              <el-option label="子分类ID" value="subclass_id"></el-option>
              <el-option label="上级主分类ID" value="superior_class_id"></el-option>
              <el-option label="级别" value="level"></el-option>
              <el-option label="名称" value="name"></el-option>
            </el-select>
          </el-input>
        </span>
        <span class="fr margin10">
          <el-button @click="screenFun" type="primary" size="mini">筛选
          </el-button>
        </span>
        <span class="fr margin10">
          <el-button @click="LookAllFun" type="primary" size="mini">清除筛选
          </el-button>
        </span>
      </div>
      <el-table size="mini" max-height="550" ref="multipleTable"
        @selection-change="handleSelectionChange" :data="tableData" border
        stripe style="width: 100%">
        <el-table-column width="55" prop="class_sort" type="index" label="序号">
        </el-table-column>
        <el-table-column prop="class_id" label="分类ID">
        </el-table-column>
        <el-table-column prop="subclass_id" label="子分类ID" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="superior_class_id" label="上级著分类ID">
        </el-table-column>
        <el-table-column prop="level" label="级别">
        </el-table-column>
        <el-table-column prop="name" label="名称">
        </el-table-column>
        <el-table-column prop="class_sort" label="分类排序">
        </el-table-column>
        <el-table-column prop="character" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editTable(scope.row) ">
              编辑</el-button>
          </template>
        </el-table-column>

      </el-table>
      <!-- 分页 -->
      <el-pagination class="pagination" background layout="prev, pager, next"
        @current-change="handleCurrentChange" :current-page.sync="currentPage"
        :total="total">
      </el-pagination>
    </div>

    <!-- 编辑模态 -->
    <el-dialog width="30%" title="编辑" :visible.sync="dialogFormVisible">
      <div v-if="dialogFormVisible">
        <el-form :model="ruleForm" status-icon ref="ruleForm" :rules="rules"
          label-width="100px" class="demo-ruleForm">
          <el-form-item class="jueseName" label="名称" prop="name">
            <el-input v-model="ruleForm.name" size="small" autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item class="jueseName" label="分类排序" prop="class_sort">
            <el-input size="small" v-model="ruleForm.class_sort"
              autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm('ruleForm')">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
export default {
  data() {
    return {
      class_id: '',
      searchData: {},
      currentPage: 1,
      total: 0,
      dialogFormVisible: false,
      dialogTableVisible: false,
      crumData: {
        breadItem: [{ name: '内容' }, { name: '导航管理' }],
        leadingIn: true,
        leadingOut: true
      },
      tableData: [],
      value1: '',
      value2: '',
      searchValue: '',
      searchSelect: '',
      multipleSelection: [],
      ruleForm: {
        name: '',
        // phoneNumber: '',
        class_sort: ''
      },
      rules: {
        class_sort: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
        name: [{ required: true, message: '内容不能为空', trigger: 'blur' }]
      },
      addMenu: '',
      menuVisible: false,
      subjectVisible: false,
      subjectMenu: '',
      formData: ''
    }
  },
  watch: {
    // 文件上传
    formData(newValue) {
      if (this.formData !== '') {
        this.importPro()
      }
    }
  },
  methods: {
    newAccount() {},
    importPro() {
      this.$http({
        method: 'post',
        url: '/na/navigationImport',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: this.formData
      }).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message({
            type: 'success',
            message: res.message
          })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    confirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http({
            method: 'put',
            url: `/na/navigationUpdate`,
            params: { class_id: this.class_id, ...this.ruleForm }
          }).then(res => {
            if (res.code == 200) {
              this.$message({ type: 'success', message: res.message })
              this.tableDataApi(this.currentPage, this.searchData).then(res => {
                if (res.code == 200) {
                  this.tableData = res.data.list.data
                  this.total = res.data.list.total
                }
              })
              this.dialogFormVisible = false
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    editTable(row) {
      this.dialogFormVisible = true
      this.ruleForm.name = row.name
      this.ruleForm.class_sort = row.class_sort
      this.class_id = row.class_id
    },
    handleCurrentChange(val) {
      if (JSON.stringify(this.searchData) !== '{}') {
        this.searchSelect = Object.keys(this.searchData)[0]
        this.searchValue = this.searchData[this.searchSelect]
      } else {
        this.searchSelect = ''
        this.searchValue = ''
      }

      this.tableDataApi(val, this.searchData).then(res => {
        if (res.code == 200) {
          console.log(res)
          this.tableData = res.data.list.data
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    edit() {
      this.dialogFormVisible = true
    },
    toBillDetail() {
      this.$router.push({ name: 'BillDetail' })
    },
    // 查看全部按钮
    LookAllFun() {
      this.searchSelect = ''
      this.searchValue = ''
      this.searchData = {}
      this.tableDataApi().then(res => {
        this.tableData = res.data.list.data
        this.total = res.data.list.total
      })
    },
    // 筛选按钮
    screenFun() {
      let mockData = {}
      mockData[this.searchSelect] = this.searchValue
      this.searchData = mockData
      this.currentPage = 1
      this.tableDataApi(this.currentPage, this.searchData).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.list.data
          this.total = res.data.list.total
        }
      })
    },
    // 导航列表接口
    tableDataApi(page, params) {
      let res = this.$http.get('/na/navigationShow', { params: { page, ...params } })
      return res
    },
    async initPage() {
      let tableData = await this.tableDataApi()
      if (tableData.code == 200) {
        this.tableData = tableData.data.list.data
        this.total = tableData.data.list.total
      }
    },
    // 导出商品
    downLoad() {
      // if (!isNull(this.slectInputData)) {
      //   this.searchItem.searchSelect = Object.keys(this.slectInputData)[0]
      //   this.searchItem.searchValue = this.slectInputData[this.searchItem.searchSelect]
      // } else {
      //   this.searchItem.searchSelect = ''
      //   this.searchItem.searchValue = ''
      // }
      this.$http({ method: 'get', url: '/na/navigationExport' }).then(res => {
        if (res) {
          console.log(res)
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
      // link.setAttribute('download', 'excel.csv')

      document.body.appendChild(link)
      link.click()
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
.popoverButton {
  margin-left: 10px;
}
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
    padding: 10px 0;
  }
}

.tableName {
  font-weight: bold;
  align-self: flex-end;
  text-align: right;
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
  width: 100px;
}

.vue-cropper {
  height: 100px;
}

.addMenuButtonContainer {
  text-align: center;
  margin-top: 28px;
}

.jueseName {
  max-width: 500px;
}
</style>

<style>
.searchContainer .searchInput .el-input-group__prepend {
  background: #fff;
}
</style>

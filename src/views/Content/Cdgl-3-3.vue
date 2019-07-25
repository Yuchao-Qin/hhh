<template>
  <!-- 工作日志 -->
  <div class="page">
    <!-- 面包屑 -->
    <Breadcrumb :crumData="crumData"></Breadcrumb>
    <!-- 账户管理 -->
    <div class="tableContainer">
      <div :gutter="3" class="tableTitle">
        <span class="fl">
          <el-select v-model="shang_jia" size="mini" placeholder="是否上架">
            <el-option value="1" label="上架"></el-option>
            <el-option value="0" label="下架"></el-option>
          </el-select>
        </span>

        <span class="fr margin20" :span="8">
          <el-button size="mini" type="primary" @click="screenFun">筛选
          </el-button>
          <el-button size="mini" type="primary" @click="lookAllFun">清除筛选
          </el-button>
          <el-button size="mini" type="primary" @click="addSubjectFun">+添加菜单
          </el-button>
        </span>
        <span class="fr margin10" :span="6">
          <span class="hidetitle">{{statusHTM}}</span>
          <el-button size="mini" type="primary" @click="setDisplay">
            {{statusBtn}}</el-button>
        </span>
      </div>
      <el-table size="mini" max-height="510" :data="tableData" border stripe
        style="width: 100%">
        <el-table-column prop="sort" width="50" label="排序">
        </el-table-column>
        <el-table-column prop="title" label="菜单名称">
        </el-table-column>
        <el-table-column prop="character" label="图标">
          <template slot-scope="scope">
            <a :href="scope.row.path" target="view_window">
              <el-image style="width: 100px; height: 100px"
                :src="scope.row.path" fit="fill"></el-image>
            </a>
          </template>
        </el-table-column>
        <el-table-column prop="character" label="是否上架">
          <template slot-scope="scope">
            <span>{{scope.row.display==1?'上架':'下架'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="child_title" label="菜单详情页分类标题">
        </el-table-column>
        <el-table-column prop="operating" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="delet"
              @click="$router.push({name:'MenuManage',params:{id:scope.row.id}})">
              商品管理</el-button>
            <el-button type="text" size="small"
              @click="tableItemEdit(scope.row)">
              编辑</el-button>
            <el-button type="text" class="delet" size="small"
              @click="tableDeletFun(scope.row)">
              删除</el-button>
          </template>

        </el-table-column>
        <!-- <el-table-column prop="FromIp" label="来源IP">
        </el-table-column> -->
      </el-table>
      <!-- 添加专题模态框 -->
      <el-dialog width="40%" class="addSubjectTitle" title="添加菜单"
        :visible.sync="addSubject">
        <template v-if="addSubject">
          <el-form label-width="100px" :model="ruleForm" ref="ruleForm"
            status-icon width="40%" :rules="rules" class="demo-ruleForm">
            <el-form-item class="jueseName" prop="title" label="菜单名称">
              <el-input v-model="ruleForm.title" size="small"
                autocomplete="off">
              </el-input>
            </el-form-item>
            <el-form-item class="jueseName" prop="sort" label="排序">
              <el-input v-model="ruleForm.sort" size="small" autocomplete="off">
              </el-input>
            </el-form-item>
            <el-form-item class="jueseName" prop="child_title" label="子菜单名">
              <el-input v-model="ruleForm.child_title" size="small"
                autocomplete="off">
              </el-input>
            </el-form-item>
            <el-form-item class="jueseName" prop="display" label="是否上架">
              <el-select v-model="ruleForm.display" size="small"
                placeholder="是否上架">
                <el-option value="1" label="上架">上架</el-option>
                <el-option value="0" label="下架">下架</el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </template>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogEditVisible = false">取 消</el-button>
          <el-button type="primary" @click="addConfirmFun('ruleForm')">确 定
          </el-button>
        </div>
        <Pic :pid.sync="ruleForm.icon"></Pic>
      </el-dialog>
      <!-- 编辑模态框 -->
      <el-dialog width="40%" class="addSubjectTitle" title="编辑"
        :visible.sync="menuDialogVisible">
        <template v-if="menuDialogVisible">
          <el-form label-width="100px" :model="ruleForm" ref="ruleForm"
            status-icon width="40%" :rules="rules" class="demo-ruleForm">
            <el-form-item class="jueseName" prop="title" label="菜单名称">
              <el-input v-model="ruleForm.title" size="small"
                autocomplete="off">
              </el-input>
            </el-form-item>
            <el-form-item class="jueseName" prop="sort" label="排序">
              <el-input v-model="ruleForm.sort" size="small" autocomplete="off">
              </el-input>
            </el-form-item>
            <el-form-item class="jueseName" prop="child_title" label="子菜单名">
              <el-input v-model="ruleForm.child_title" size="small"
                autocomplete="off">
              </el-input>
            </el-form-item>
            <el-form-item class="jueseName" prop="display" label="是否上架">
              <el-select v-model="ruleForm.display" size="small"
                placeholder="是否上架">
                <el-option value="1" label="上架">上架</el-option>
                <el-option value="0" label="下架">下架</el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </template>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogEditVisible = false">取 消</el-button>
          <el-button type="primary" @click="Editconfirm('ruleForm')">确 定
          </el-button>
        </div>
        <Pic :pid.sync="ruleForm.icon" :upImgEdit="upImgEdit"></Pic>
      </el-dialog>
      <!-- 分页 -->
      <!-- <el-pagination class="pagination" background layout="prev, pager, next"
        :pager-count='17' :total="1000">
      </el-pagination> -->
    </div>
  </div>
</template>
<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
import Pic from '@/components/PictureUpload.vue'
import { type } from 'os'
export default {
  data() {
    return {
      id: '',
      status: '',
      upImgEdit: '',
      searchData: {},
      addSubject: false,
      menuDialogVisible: false,
      crumData: {
        breadItem: [{ name: '内容' }, { name: '菜单管理' }],
        leadingIn: false,
        leadingOut: false
      },
      tableData: [],
      value1: '',
      value2: '',
      searchValue: '',
      shang_jia: '',
      ruleForm: {
        title: '',
        sort: '',
        child_title: '',
        display: '',
        icon: ''
      },
      rules: {
        title: [{ required: true, message: '内容不可为空', trigger: 'blur' }],
        sort: [{ required: true, message: '内容不可为空', trigger: 'blur' }],
        child_title: [{ required: true, message: '内容不可为空', trigger: 'blur' }],
        display: [{ required: true, message: '内容不可为空', trigger: 'change' }]
        // pic: [{ required: true, message: '内容不可为空', trigger: 'blur' }]
      }
    }
  },
  watch: {
    radio1(newValue) {
      this.crumData = [{ name: '设置' }, { name: '账户权限' }, { name: newValue }]
    }
  },
  computed: {
    statusHTM() {
      if (this.status == 0) {
        return '当前菜单模块显示状态为-隐藏'
      } else {
        return '当前菜单模块显示状态为-显示'
      }
    },
    statusBtn() {
      if (this.status == 0) {
        return '设置菜单模块为显示'
      } else {
        return '设置菜单模块为隐藏'
      }
    }
  },
  methods: {
    newAccount() {},
    // 设置菜单模块显示隐藏
    setDisplay() {
      this.$http({
        method: 'PATCH',
        url: '/menu/display',
        params: {
          display: this.status == 0 ? 1 : 0
        }
      }).then(res => {
        if (res.code == 200) {
          this.$message({ type: 'success', message: res.message })
          this.initPage()
        }
      })
    },
    addSubjectFun() {
      this.addSubject = true
      let arr = Object.keys(this.ruleForm)
      arr.forEach(item => {
        this.ruleForm[item] = ''
      })
    },
    tableItemEdit(row) {
      this.menuDialogVisible = true
      this.ruleForm.title = row.title
      this.ruleForm.sort = row.sort
      this.ruleForm.child_title = row.child_title
      this.ruleForm.icon = row.icon
      this.ruleForm.display = row.display.toString()
      this.upImgEdit = row.path
      this.id = row.id
    },
    Editconfirm(formName) {
      this.$refs[formName].validate(valid => {
        console.log(valid)
        if (valid && this.ruleForm.icon !== '') {
          this.$http({
            method: 'PUT',
            url: `/menu/${this.id}`,
            params: {
              ...this.ruleForm
            }
          }).then(res => {
            if (res.code == 200) {
              this.initPage()
              this.menuDialogVisible = false
              this.$message({ type: 'success', message: res.message })
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    tableDeletFun(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.DELETFUN(row)
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    DELETFUN(row) {
      this.$http({
        method: 'DELETE',
        url: `/menu/${row.id}`
      }).then(res => {
        if (res.code == 200) {
          this.$message({ type: 'success', message: res.message })
          this.initPage()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    addConfirmFun(formName) {
      this.$refs[formName].validate(valid => {
        console.log(valid)
        if (valid && this.ruleForm.icon !== '') {
          this.$http({
            method: 'POST',
            url: '/menu/save',
            params: {
              ...this.ruleForm
            }
          }).then(res => {
            if (res.code == 200) {
              this.initPage()
              this.addSubject = false
              this.$message({ type: 'success', message: res.message })
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    screenFun() {
      this.searchData.display = this.shang_jia
      this.tableListApi(this.searchData).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.list
          this.status = res.data.status
        }
      })
    },
    lookAllFun() {
      this.shang_jia = ''
      this.searchData.display = this.shang_jia
      this.tableListApi(this.searchData).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.list
          this.status = res.data.status
        }
      })
    },
    tableListApi(params) {
      let res = this.$http({
        method: 'GET',
        url: '/menu/lists',
        params: { ...params }
      })
      return res
    },
    initPage() {
      this.tableListApi().then(res => {
        if (res.code == 200) {
          this.tableData = res.data.list
          this.status = res.data.status
        }
      })
    }
  },
  mounted() {
    this.initPage()
  },
  components: {
    Breadcrumb,
    Pic
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
  margin-right: 5px;
}

.jueseName {
  max-width: 500px;
}

.margin20 {
  margin-right: 20px;
}
</style>

<style>
.addSubjectTitle .el-dialog__header {
  text-align: center;
}

.jueseName .el-select {
  width: 100%;
}
</style>


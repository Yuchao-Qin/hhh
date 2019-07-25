<template>
  <div class="page">
    <!-- 面包屑 -->
    <Breadcrumb :crumData="crumData"></Breadcrumb>
    <!-- tab -->
    <div class="headGroup">
      <el-radio-group v-model="radio1" size="small">
        <el-radio-button label="搜索管理"></el-radio-button>
        <el-radio-button label="帮助中心管理"></el-radio-button>
        <el-radio-button label="完善信息赠送管理"></el-radio-button>
      </el-radio-group>
    </div>
    <!-- 搜索管理 -->
    <div v-show="radio1 === '搜索管理'" class="tableContainer">
      <div :gutter="3" class="tableTitle">
        <span class="fl" :span="6">
          <el-form size="mini" class="margin10" label-width="90px">
            <el-form-item label="搜索框文字">
              <el-input placeholder="请输入内容" label="发现文字" v-model="searchValue"
                class="searchInput" disabled>
              </el-input>
            </el-form-item>
          </el-form>
          <el-popover class="popoverButton " placement="left" width="200"
            trigger="click" v-model="subjectVisible">
            <el-input v-model="searchValue_edit" size="mini"></el-input>
            <div class="addMenuButtonContainer">
              <el-button size="mini" type="primary" @click="addSub">确认编辑
              </el-button>
            </div>
            <el-button slot="reference" size="mini" type="primary">编辑搜索框文字
            </el-button>
          </el-popover>
        </span>
        <span class="fr" :span="6">
          <el-button size="mini" type="primary" @click="deletChecked">删除选中项
          </el-button>
          <el-button size="mini" type="primary" @click="addFindFontFun">+
            添加搜索发现文字</el-button>
        </span>
      </div>
      <el-table :data="tableData" size="mini" max-height="550" border stripe
        @selection-change="handleSelectionTable" style="width: 100%">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="sort" type="sort" width="55" label="排序">
        </el-table-column>
        <el-table-column prop="text" label="文本内容">
        </el-table-column>
        <el-table-column prop="color" label="文本颜色">
          <template slot-scope="scope">
            <span class="table_collor">{{scope.row.color}}</span>
            <el-color-picker v-model="scope.row.color" disabled>
            </el-color-picker>
          </template>
        </el-table-column>
        <el-table-column prop="operating" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="delet"
              @click="editFun(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="deletAtable(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加发现文字模态 -->
      <el-dialog width="30%" title="添加搜索发现文字" :visible.sync="dialogFormVisible">
        <template v-if="dialogFormVisible">
          <el-form :model="ruleForm" status-icon :rules="fontrules"
            ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="排序" prop="sort">
              <el-input v-model="ruleForm.sort" size="small" autocomplete="off">
              </el-input>
            </el-form-item>
            <el-form-item label="文本内容" prop="text">
              <el-input size="small" v-model="ruleForm.text" autocomplete="off">
              </el-input>
            </el-form-item>
            <div class="block">
              <span class="demonstration">选择文本颜色</span>
              <el-color-picker v-model="ruleForm.color"></el-color-picker>
              <span class="colorText">{{ruleForm.color}}</span>
            </div>
          </el-form>
        </template>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addFindFontconfirm('ruleForm')">确认添加
          </el-button>
        </div>
      </el-dialog>
      <!-- 编辑模态 -->
      <el-dialog width="30%" title="编辑搜索发现文字" :visible.sync="FontEditVisible">
        <template v-if="FontEditVisible">
          <el-form :model="ruleForm" status-icon :rules="fontrules"
            ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="排序" prop="sort">
              <el-input v-model="ruleForm.sort" size="small" autocomplete="off">
              </el-input>
            </el-form-item>
            <el-form-item label="文本内容" prop="text">
              <el-input size="small" v-model="ruleForm.text" autocomplete="off">
              </el-input>
            </el-form-item>
            <div class="block">
              <span class="demonstration">选择文本颜色</span>
              <el-color-picker v-model="ruleForm.color">
              </el-color-picker>
              <span class="colorText">{{ruleForm.color}}</span>
            </div>
          </el-form>
        </template>
        <div slot="footer" class="dialog-footer">
          <el-button @click="FontEditVisible = false">取 消</el-button>
          <el-button type="primary" @click="EditFontconfirm('ruleForm')">确认添加
          </el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 帮助中心管理 -->
    <div v-show="radio1 === '帮助中心管理'" class="tableContainer">
      <div :gutter="5" class="tableTitle">
        <span class="addAccount fl" :span="8">
          <el-button size="mini" type="primary" @click="addHelpFun">+
            添加</el-button>
        </span>
      </div>
      <el-table :data="JueseTableData" size="mini" max-height="550" border
        stripe style="width: 100%">
        <el-table-column prop="sort" width="55" label="排序">
        </el-table-column>
        <el-table-column prop="title" label="标题">
        </el-table-column>
        <el-table-column prop="content" label="内容">
        </el-table-column>
        <el-table-column prop="operating" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="delet"
              @click="helpEditFun(scope.row)">编辑</el-button>
            <el-button type="text" size="small"
              @click="helpDeletFun(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加帮助内容模态 -->
      <el-dialog width="30%" title="添加帮助内容" :visible.sync="dialogTableVisible">
        <template v-if="dialogTableVisible">
          <el-form :model="helpRuleForm" status-icon :rules="helpRules"
            ref="helpRuleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item class="jueseName" prop="sort" label="排序">
              <el-input v-model="helpRuleForm.sort" size="small"
                autocomplete="off">
              </el-input>
            </el-form-item>
            <el-form-item class="jueseName" prop="title" label="标题">
              <el-input v-model="helpRuleForm.title" size="small"
                autocomplete="off">
              </el-input>
            </el-form-item>
            <el-form-item class="jueseName" prop="content" label="内容">
              <el-input type="textarea" v-model="helpRuleForm.content"
                size="small" autocomplete="off">
              </el-input>
            </el-form-item>
          </el-form>
        </template>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="addHelpconfirm('helpRuleForm')">确 定
          </el-button>
        </div>
      </el-dialog>
      <!-- 编辑版关注内容模态框 -->
      <el-dialog width="50%" title="添加帮助内容" :visible.sync="dialogEditVisible">
        <template v-if="dialogEditVisible">
          <el-form :model="helpRuleForm" status-icon :rules="helpRules"
            ref="helpRuleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item class="jueseName" prop="sort" label="排序">
              <el-input v-model="helpRuleForm.sort" size="small"
                autocomplete="off">
              </el-input>
            </el-form-item>
            <el-form-item class="jueseName" prop="title" label="标题">
              <el-input v-model="helpRuleForm.title" size="small"
                autocomplete="off">
              </el-input>
            </el-form-item>
            <el-form-item class="jueseName" prop="content" label="内容">
              <el-input type="textarea" v-model="helpRuleForm.content"
                size="small" autocomplete="off">
              </el-input>
            </el-form-item>
          </el-form>
        </template>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogEditVisible = false">取 消</el-button>
          <el-button type="primary" @click="HelpEditconfirm('helpRuleForm')">确 定
          </el-button>
        </div>
      </el-dialog>
      <!-- 分页 -->
      <!-- <el-pagination class="pagination" background layout="prev, pager, next"
        :pager-count='17' :total="1000">
      </el-pagination> -->
    </div>
    <!-- 完善信息赠送管理 -->
    <div v-show="radio1 === '完善信息赠送管理'">
      <div class="fromPage">
        <el-form size="mini" label-width="100px">
          <!-- <el-form-item label="图片">
            <el-input placeholder="请输入内容" label="发现文字"
              v-model="ruleForm.searchValue" class="searchInput" disabled>
            </el-input>
          </el-form-item> -->
          <el-form-item label="赠送金额">
            <el-input placeholder="请输入内容" label="发现文字" v-model="GiveFrom.amount"
              class="searchInput" disabled>
            </el-input>
          </el-form-item>
          <el-form-item label="显示状态">
            <el-select v-model="GiveFrom.status" disabled>
              <el-option label="显示" value="1"></el-option>
              <el-option label="不显示" value="0"></el-option>
            </el-select>
          </el-form-item>
          <div class="imgContent">
            <span class="imgTitle">图片</span>
            <el-image style="width: 100px; height: 100px" class="fl"
              :src="GiveFrom.icon" fit="fill">
            </el-image>
          </div>
        </el-form>
        <el-button type="primary" size="mini" class="editBtn" @click="GiveEdit">
          编辑</el-button>
      </div>
      <!-- 完善信息曾送管理模态框 -->
      <el-dialog width="30%" title="添加帮助内容" :visible.sync="GiveEditVisible">
        <template v-if="GiveEditVisible">
          <el-form :model="GiveFromData"  :rules="giverules" ref="GiveFromData" status-icon label-width="100px"  class="demo-ruleForm">
            <el-form-item class="jueseName" prop="amount" label="曾送金额">
              <el-input v-model="GiveFromData.amount" size="mini"
                autocomplete="off">
              </el-input>
            </el-form-item>
            <el-form-item class="jueseName" prop="status" label="显示状态">
              <el-select v-model="GiveFromData.status" size="mini">
                <el-option label="显示" value="1"></el-option>
                <el-option label="不显示" value="0"></el-option>
              </el-select>
            </el-form-item>
            <Pic :pid.sync="GiveFromData.icon" :upImgEdit="upImgEdit"></Pic>
          </el-form>
        </template>
        <div slot="footer" class="dialog-footer">
          <el-button @click="GiveEditVisible = false">取 消</el-button>
          <el-button type="primary" @click="GiveEditconfirm('GiveFromData')">确 定
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Pic from '@/components/PictureUpload.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { isNull } from 'util'
export default {
  data() {
    return {
      upImgEdit: '',
      GiveFrom: { icon: '', amount: '', status: '' },
      GiveFromData: { icon: '', amount: '', status: '', pid: '' },
      helpId: '',
      fontId: '',
      multipleSelection: [],
      subjectVisible: false,
      searchValue: '',
      searchValue_edit: '',
      radio1: '搜索管理',
      Show: '1',
      dialogEditVisible: false,
      FontEditVisible: false,
      GiveEditVisible: false,
      findFont: true,
      activeNames: '',
      overView: [],
      management: [],
      content: [],
      setting: [],
      text: { desc: null },
      jueSeName: '',
      crumData: {
        breadItem: [{ name: '内容' }, { name: '其他管理' }],
        leadingIn: false,
        leadingOut: false
      },
      tableData: [],
      JueseTableData: [],
      dialogFormVisible: false,
      dialogTableVisible: false,
      ruleForm: {
        color: '#000000',
        sort: '',
        text: ''
      },
      fontrules: {
        sort: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
        text: [{ required: true, message: '内容不能为空', trigger: 'blur' }]
      },
      helpRuleForm: {
        content: '',
        sort: '',
        title: ''
      },
      helpRules: {
        title: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
        sort: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
        content: [{ required: true, message: '内容不能为空', trigger: 'blur' }]
      },
      giverules:{
        amount: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
        status: [{ required: true, message: '内容不能为空', trigger: 'blur' }]
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    //
    GiveEditconfirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http({
            method: 'POST',
            url: `/other/bindReward`,
            params: { ...this.GiveFromData }
          }).then(res => {
            if (res.code == 200) {
              this.dialogEditVisible = false
              this.$message({
                type: 'success',
                message: res.message
              })
              this.OtherBindInfo()
              this.GiveEditVisible = false
            } else {
              this.$message.error(res.code)
            }
          })
        }
      })
    },
    // 赠送管理模态框
    GiveEdit() {
      this.$http.get('/other/bindInfo').then(res => {
        if ((res.code = 200)) {
          this.GiveEditVisible = true
          this.GiveFromData = res.data
          this.GiveFromData.pic = ''
          this.upImgEdit = res.data.icon
        }
      })
    },
    // 删除单个帮助数据
    helpDeletFun(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.HELPDELET(row)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 删除单个帮助数据函数
    HELPDELET(row) {
      this.$http.delete(`/other/article/${row.id}`).then(res => {
        if (res.code == 200) {
          this.OtherArticles()
          this.$message({
            type: 'success',
            message: res.message
          })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 提交编辑帮助表单
    HelpEditconfirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http({
            method: 'PUT',
            url: `/other/article/${this.helpId}`,
            params: { ...this.helpRuleForm }
          }).then(res => {
            if (res.code == 200) {
              this.dialogEditVisible = false
              this.$message({
                type: 'success',
                message: res.message
              })
              this.OtherArticles()
            } else {
              this.$message.error(res.code)
            }
          })
        }
      })
    },
    // 帮助编辑按钮
    helpEditFun(row) {
      this.dialogEditVisible = true
      this.helpId = row.id
      this.helpRuleForm.content = row.content
      this.helpRuleForm.sort = row.sort
      this.helpRuleForm.title = row.title
    },
    // 添加帮助表单提交
    addHelpconfirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http({
            method: 'POST',
            url: `/other/article`,
            params: { ...this.helpRuleForm }
          }).then(res => {
            if (res.code == 200) {
              this.dialogTableVisible = false
              this.$message({
                type: 'success',
                message: res.message
              })
              this.OtherArticles()
            } else {
              this.$message.error(res.code)
            }
          })
        }
      })
    },
    // 添加帮助内容按钮
    addHelpFun() {
      Object.keys(this.helpRuleForm).forEach(item => {
        this.helpRuleForm[item] = ''
      })
      this.dialogTableVisible = true
    },
    // 提交编辑搜索发现文字表单
    EditFontconfirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid && !isNull(this.ruleForm.color)) {
          this.$http({
            method: 'PUT',
            url: `/other/word/${this.fontId}`,
            params: { ...this.ruleForm }
          }).then(res => {
            if (res.code == 200) {
              this.FontEditVisible = false
              this.$message({
                type: 'success',
                message: res.message
              })
              this.OtherWorlds()
            } else {
              this.$message.error(res.code)
            }
          })
        }
      })
    },
    // 搜索管理编辑按钮
    editFun(row) {
      console.log(row.color)
      this.fontId = row.id
      this.ruleForm.color = row.color
      this.ruleForm.sort = row.sort
      this.ruleForm.text = row.text
      this.FontEditVisible = true
    },
    // 删除单个搜索管理数据
    deletAtable(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deletAtableFUN(row)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 删除单个搜索管理数据函数
    deletAtableFUN(row) {
      this.$http.delete(`/other/word/${row.id}`).then(res => {
        if (res.code == 200) {
          this.OtherWorlds()
          this.$message({
            type: 'success',
            message: res.message
          })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 添加发现文字提交表单
    addFindFontconfirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid && !isNull(this.ruleForm.color)) {
          this.$http({
            method: 'post',
            url: '/other/word',
            params: { ...this.ruleForm }
          }).then(res => {
            if (res.code == 200) {
              this.dialogFormVisible = false
              this.$message({
                type: 'success',
                message: res.message
              })
              this.OtherWorlds()
            } else {
              this.$message.error(res.code)
            }
          })
        }
      })
    },
    // 添加发现文字
    addFindFontFun() {
      this.ruleForm.sort = ''
      this.ruleForm.text = ''
      this.ruleForm.color = '#000000'
      this.dialogFormVisible = true
    },
    // 删除选中项
    deletChecked() {
      if (this.multipleSelection.length == 0) {
        this.$message.error('请选择商品')
        return
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.DELETFUN()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 删除函数
    DELETFUN() {
      let deletIdArr = this.multipleSelection.map(item => {
        return item.id
      })
      let stringdelet = deletIdArr.join(',')
      this.$http.delete(`/other/allWord`, { params: { ids: stringdelet } }).then(res => {
        if (res.code == 200) {
          this.$message({ type: 'success', message: res.message })
          this.OtherWorlds()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 选中项数据
    handleSelectionTable(val) {
      this.multipleSelection = val
    },
    // 确认编辑
    addSub() {
      this.$http({
        method: 'POST',
        url: '/other/placeholder',
        params: { text: this.searchValue_edit }
      }).then(res => {
        if (res.code == 200) {
          this.OtherWorlds()
          this.subjectVisible = false
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
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
    },
    // 发现文字列表
    OtherWorlds(params) {
      this.$http({
        method: 'GET',
        url: '/other/words',
        params: { ...params }
      }).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.list
          this.searchValue = res.data.placehloder_text
          this.searchValue_edit = res.data.placehloder_text
        }
      })
    },
    // 帮助文章列表
    OtherArticles(params) {
      this.$http({
        method: 'get',
        url: '/other/articles',
        params: { ...params }
      }).then(res => {
        if (res.code == 200) {
          this.JueseTableData = res.data
        }
      })
    },
    // 曾送
    OtherBindInfo(params) {
      this.$http({
        method: 'get',
        url: '/other/bindInfo',
        params: { ...params }
      }).then(res => {
        if (res.code == 200) {
          this.GiveFrom = res.data
        }
      })
    },
    async initTable() {
      await this.OtherWorlds()
      await this.OtherArticles()
      await this.OtherBindInfo()
    }
  },
  mounted() {
    this.initTable()
  },
  components: {
    Breadcrumb,
    Pic
  }
}
</script>

<style lang="scss" scoped>
.table_collor {
  vertical-align: middle;
  display: inline-block;
  line-height: 40px;
  padding-left: 5px;
}
.el-color-picker {
  float: left;
}
.block {
  text-align: left;
  .colorText {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 0 0 12px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .demonstration {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
}

.addMenuButtonContainer {
  text-align: center;
  margin-top: 28px;
}
.page {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.headGroup {
  padding-top: 20px;
}

.tableContainer {
  padding: 0 15px;
  .tableTitle {
    padding: 10px;
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

.el-select {
  width: 100%;
}

.el-checkbox-group {
  text-align: left;
}

.jueseName {
  // width: 40%;
  max-width: 500px;
  text-align: left;
}

.collapseItem {
  margin-right: 30px;
}

.headEdit {
  margin-left: 10px;
}

.fromPage {
  padding: 25px;
  width: 40%;
  margin: auto;
  position: relative;
  left: -43px;
}

.imgTitle {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100px;
}

.imgContent {
  overflow: hidden;
  margin-bottom: 40px;
}
.editBtn {
  width: 140px;
}
</style>



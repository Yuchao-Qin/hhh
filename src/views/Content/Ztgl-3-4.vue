<template>
  <!-- 工作日志 -->
  <div class="page">
    <!-- 面包屑 -->
    <Breadcrumb :crumData="crumData"></Breadcrumb>
    <!-- 账户管理 -->
    <div class="tableContainer">
      <div :gutter="3" class="tableTitle">
        <span :span="6" class="fl">
          <span class="hidetitle">{{status_HTM}}</span>
          <el-button size="mini" type="primary" @click="statusFun">
            {{status_Btn}}</el-button>
        </span>
        <span :span="8" class="fr">
          <el-button size="mini" type="primary" @click="addSubjectFun">+添加专题
          </el-button>
        </span>
      </div>
      <el-table size="mini" max-height="550" :data="tableData" border stripe
        style="width: 100%">
        <el-table-column prop="special_topic_type" label="专题类型名">
        </el-table-column>
        <el-table-column label="首页专题图片">
          <template slot-scope="scope">
            <a :href="scope.row.home_img_path" target="view_window">
              <el-image style="width: 100px; height: 100px"
                :src="scope.row.home_img_path" fit="fill">
              </el-image>
            </a>
          </template>
        </el-table-column>
        <el-table-column prop="details_title" label="专题详情页标题">
        </el-table-column>
        <el-table-column prop="details_img_path" label="专题详情页大图">
          <template slot-scope="scope">
            <a :href="scope.row.details_img_path" target="view_window">
              <el-image style="width: 100px; height: 100px"
                :src="scope.row.details_img_path" fit="fill">
              </el-image>
            </a>
          </template>
        </el-table-column>
        <el-table-column prop="details_jump_id" label="大图跳转商品ID">
        </el-table-column>
        <el-table-column prop="operating" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="delet"
              @click="$router.push({name:'ProdectManage',params:{name:scope.row.special_topic_type,special_id:scope.row.special_id}})">
              商品管理</el-button>
            <el-button type="text" size="small"
              @click="subjectEditFun(scope.row)">编辑
            </el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="FromIp" label="来源IP">
        </el-table-column> -->
      </el-table>
      <!-- 添加专题模态框 -->
      <el-dialog width="40%" class="addSubjectTitle" title="添加专题"
        :visible.sync="addSubject">
        <template v-if="addSubject">
          <el-form label-width="180px" :model="ruleForm" ref="ruleForm"
            :rules="rules" status-icon width="40%" class="demo-ruleForm">
            <el-form-item class="jueseName" prop="special_topic_type"
              label="专题类型名">
              <el-input v-model="ruleForm.special_topic_type" size="small"
                autocomplete="off">
              </el-input>
            </el-form-item>
            <el-form-item class="jueseName" prop="details_title"
              label="专题详情页标题">
              <el-input v-model="ruleForm.details_title" size="small"
                autocomplete="off">
              </el-input>
            </el-form-item>
            <el-form-item class="jueseName" prop="details_jump_id"
              label="专题详情页跳转商品ID">
              <el-input v-model="ruleForm.details_jump_id" size="small"
                autocomplete="off">
              </el-input>
            </el-form-item>
            <div style="overflow:hidden">
              <Pic class="fl margin10" :pid.sync="ruleForm.home_img_id">
                <template v-slot:picBtn>点击上传首页专题图片</template>
              </Pic>
              <Pic class="fl" :pid.sync="ruleForm.details_img_id">
                <template v-slot:picBtn>点击上传专题详情页大图</template>
              </Pic>
            </div>
          </el-form>
        </template>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addSubject = false">取 消</el-button>
          <el-button type="primary" @click="addSubjectconfirm('ruleForm')">确 定
          </el-button>
        </div>
      </el-dialog>
      <!-- 编辑模态框 -->
      <el-dialog width="40%" class="addSubjectTitle" title="编辑"
        :visible.sync="subjectEditVisible">
        <template v-if="subjectEditVisible">
          <el-form label-width="180px" :model="ruleForm" ref="ruleForm"
            :rules="rules" status-icon width="40%" class="demo-ruleForm">
            <el-form-item class="jueseName" prop="special_topic_type"
              label="专题类型名">
              <el-input v-model="ruleForm.special_topic_type" size="small"
                autocomplete="off">
              </el-input>
            </el-form-item>
            <el-form-item class="jueseName" prop="details_title"
              label="专题详情页标题">
              <el-input v-model="ruleForm.details_title" size="small"
                autocomplete="off">
              </el-input>
            </el-form-item>
            <el-form-item class="jueseName" prop="details_jump_id"
              label="专题详情页跳转商品ID">
              <el-input v-model="ruleForm.details_jump_id" size="small"
                autocomplete="off">
              </el-input>
            </el-form-item>
            <div style="overflow:hidden">
              <Pic class="fl margin10" :pid.sync="ruleForm.home_img_id"
                :upImgEdit="home_img_path">
                <template v-slot:picBtn>点击上传首页专题图片</template>
              </Pic>
              <Pic class="fl" :pid.sync="ruleForm.details_img_id"
                :upImgEdit="details_img_path">
                <template v-slot:picBtn>点击上传专题详情页大图</template>
              </Pic>
            </div>
          </el-form>
        </template>
        <div slot="footer" class="dialog-footer">
          <el-button @click="subjectEditVisible = false">取 消</el-button>
          <el-button type="primary" @click="editSubjectconfirm('ruleForm')">确 定
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
import Pic from '@/components/PictureUpload.vue'
export default {
  data() {
    return {
      special_status: '',
      id: '',
      home_img_path: '',
      details_img_path: '',
      addSubject: false,
      subjectEditVisible: false,
      crumData: {
        breadItem: [{ name: '设置' }, { name: '账户权限' }, { name: '账户管理' }],
        leadingIn: false,
        leadingOut: false
      },
      tableData: [],
      value1: '',
      value2: '',
      searchValue: '',
      ruleForm: {
        details_img_id: '',
        home_img_id: '',
        details_jump_id: '',
        details_title: '',
        special_topic_type: ''
      },
      rules: {
        details_title: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
        special_topic_type: [{ required: true, message: '内容不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    status_HTM() {
      if (this.special_status == 1) {
        return '当前专题栏模块状态为显示状态'
      } else {
        return '当前专题栏模块状态为隐藏状态'
      }
    },
    status_Btn() {
      if (this.special_status == 1) {
        return '专题栏模块设为隐藏'
      } else {
        return '专题栏模块设为显示'
      }
    }
  },
  methods: {
    statusFun() {
      this.$http({
        url: '/st/specialStatus',
        params: { special_status: this.special_status == 0 ? 1 : 0 },
        method: 'post'
      }).then(res => {
        if (res.code == 200) {
          this.$message({ type: 'success', message: res.message })
          this.initTable()
        }
      })
    },
    newAccount() {},
    // 添加按钮
    addSubjectFun() {
      Object.keys(this.ruleForm).forEach(item => {
        this.ruleForm[item] = ''
      })
      this.addSubject = true
    },
    // 添加提交表单
    addSubjectconfirm() {
      this.$http.post('/st/specialAdd', this.ruleForm).then(res => {
        if (res.code == 200) {
          this.$message({ type: 'success', message: res.message })
          this.addSubject = false
          this.initTable()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 编辑按钮
    subjectEditFun(row) {
      this.subjectEditVisible = true
      this.details_img_path = row.details_img_path
      this.home_img_path = row.home_img_path
      this.id = row.special_id
      this.ruleForm.details_jump_id = row.details_jump_id
      this.ruleForm.details_title = row.details_title
      this.ruleForm.special_topic_type = row.special_topic_type
      this.ruleForm.home_img_id = row.home_img_id
      this.ruleForm.details_img_id = row.details_img_id
    },
    // 编辑按钮表单提交
    editSubjectconfirm() {
      let data = this.ruleForm
      data.special_id = this.id
      this.$http.put('/st/specialUpdate', { ...data }).then(res => {
        if (res.code == 200) {
          this.$message({ type: 'success', message: res.message })
          this.subjectEditVisible = false
          this.initTable()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    initTable() {
      this.$http({
        method: 'get',
        url: '/st/specialShow'
      }).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.list
          this.special_status = res.data.special_status
        }
      })
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
  margin-right: 10px;
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

<template>
  <div class="page">
    <!-- 面包屑 -->
    <Breadcrumb :crumData="crumData"></Breadcrumb>
    <!-- tab -->
    <div class="headGroup">
      <el-radio-group v-model="radio1" size="mini">
        <el-radio-button label="广告图分类"></el-radio-button>
        <el-radio-button label="广告图管理"></el-radio-button>
      </el-radio-group>
    </div>
    <!-- 广告图分类 -->
    <div v-show="radio1 === '广告图分类'" class="tableContainer">
      <div :gutter="5" class="tableTitle">
        <span class="addAccount fl" :span="4">
          <el-button size="mini" type="primary" @click="addAdClass">+
            添加广告类别</el-button>
        </span>
      </div>
      <el-table row-key="id" size="mini" max-height="500" :data="classifyAdList"
        border stripe style="width: 100%">
        <el-table-column prop="name" label="广告图类名">
        </el-table-column>
        <el-table-column prop="operating" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="delet"
              @click="classifEdit(scope.row)">编辑</el-button>
            <el-button type="text" size="small"
              @click="deletClassif(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 新增分类模态 -->
      <el-dialog width="30%" :key='modleTooglekey' :title="classifyModleTitle"
        :visible.sync="AdvertisingClass">
        <el-form status-icon label-width="100px" class="demo-ruleForm">
          <el-form-item label="广告图类别名" prop="account">
            <el-input v-model="addClassifAdform.name" size="small"
              autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="广告图类别英文名" prop="account">
            <el-input v-model="addClassifAdform.en_name" size="small"
              autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="AdvertisingClass = false">取 消</el-button>
          <el-button type="primary" @click="addClassifFun()">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 分页 -->
      <!-- <el-pagination class="pagination" background layout="prev, pager, next"
        :pager-count='17' :total="1000">
      </el-pagination> -->
    </div>
    <!-- 广告图管理 -->
    <div v-show="radio1 === '广告图管理'" class="tableContainer">
      <div class="tableTitle">
        <span class="fl margin10" :span="4">
          <el-select size="mini" v-model="pictureClass_screen">
            <el-option v-for="(item, index) in classifyAdList" :key="index"
              :label="item.name" :value="item.id"></el-option>
          </el-select>
        </span>
        <span class="fl">
          <el-select v-model="isGrounding_screen" size="mini"
            placeholder="是否上架">
            <el-option value="1" label="上架"></el-option>
            <el-option value="0" label="下架"></el-option>
          </el-select>
        </span>
        <span class="fr" :span="4">
          <el-button size="mini" type="primary" @click="deleteAll">删除选中项
          </el-button>
        </span>
        <span class="fr margin10" :span="4">
          <el-button size="mini" type="primary" @click="addAdfun">+
            添加广告图</el-button>
        </span>
        <span class="fr margin10">
          <el-button size="mini" type="primary" @click="screenFun">筛选
          </el-button>
        </span>
      </div>
      <el-table size="mini" max-height="550" :data="manageAdList" border stripe
        style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="sort" label="排序" width="50">
        </el-table-column>
        <el-table-column prop="ad_name" label="广告名称">
        </el-table-column>
        <el-table-column prop="type_name" label="广告图类型">
        </el-table-column>
        <el-table-column prop="havePower" label="广告图片">
          <template slot-scope="scope">
            <a :href="scope.row.path" target="view_window">
              <el-image style="width: 100px" :src="scope.row.path" fit="fill">
              </el-image>
            </a>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="havePower" label="跳转商品ID">
        </el-table-column> -->
        <el-table-column prop="display" label="是否上架">
          <template slot-scope="scope">
            <div>{{scope.display == 1?'已上架':'未上架'}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="operating" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="delet"
              @click="editItem(scope.row)">编辑</el-button>
          </template>

          <!-- <el-button type="text" size="small" @click="">删除</el-button> -->
        </el-table-column>
      </el-table>
      <!-- 修改广告模态 -->
      <el-dialog width="40%" title="修改广告图" :visible.sync="dialogEditVisible">
        <template v-if="dialogEditVisible">
          <el-form :model="addNewFromData" :rules="NewFromDatarules"
            ref="addNewFromData" status-icon label-width="100px"
            class="demo-ruleForm">
            <el-form-item class="jueseName" label="广告名称" prop="ad_name">
              <el-input v-model="addNewFromData.ad_name " size="mini"
                autocomplete="off">
              </el-input>
            </el-form-item>
            <el-form-item class="jueseName" label="广告图类型" prop="tid">
              <el-select size="mini" v-model="addNewFromData.tid">
                <el-option v-for="(item, index) in classifyAdList" :key="index"
                  :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="jueseName" label="跳转商品ID" prop="gid">
              <el-input size="mini" v-model="addNewFromData.gid"
                autocomplete="off">
              </el-input>
            </el-form-item>
            <el-form-item class="jueseName" label="排序" prop="sort">
              <el-input v-model="addNewFromData.sort" size="mini"
                autocomplete="off">
              </el-input>
            </el-form-item>
            <el-form-item class="jueseName" label="是否上架" prop="display">
              <!-- <el-input v-model="jueSeName" size="small" autocomplete="off"></el-input> -->
              <el-select v-model="addNewFromData.display" placeholder="请选择活动区域"
                size="mini">
                <el-option value="1" label="上架"></el-option>
                <el-option value="0" label="下架"></el-option>
              </el-select>
            </el-form-item>
            <Pic :pid.sync="addNewFromData.pid" :upImgEdit="upImgEdit"></Pic>
          </el-form>
        </template>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogEditVisible = false">取 消</el-button>
          <el-button type="primary" @click="editConfirm('addNewFromData')">确 定
          </el-button>
        </div>
      </el-dialog>
      <!-- 添加广告图模态 -->
      <el-dialog width="40%" title="新增广告图" :visible.sync="addAdvertVisible">
        <template v-if="addAdvertVisible">
          <el-form :model="addNewFromData" :rules="NewFromDatarules"
            ref="addNewFromData" status-icon label-width="100px"
            class="demo-ruleForm">
            <el-form-item class="jueseName" label="广告名称" prop="ad_name">
              <el-input v-model="addNewFromData.ad_name " size="mini"
                autocomplete="off">
              </el-input>
            </el-form-item>
            <el-form-item class="jueseName" label="广告图类型" prop="tid">
              <el-select size="mini" v-model="addNewFromData.tid">
                <el-option v-for="(item, index) in classifyAdList" :key="index"
                  :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="jueseName" label="跳转商品ID" prop="gid">
              <el-input size="mini" v-model="addNewFromData.gid"
                autocomplete="off">
              </el-input>
            </el-form-item>
            <el-form-item class="jueseName" label="排序" prop="sort">
              <el-input v-model="addNewFromData.sort" size="mini"
                autocomplete="off">
              </el-input>
            </el-form-item>
            <el-form-item class="jueseName" label="是否上架" prop="display">
              <!-- <el-input v-model="jueSeName" size="small" autocomplete="off"></el-input> -->
              <el-select v-model="addNewFromData.display" placeholder="请选择活动区域"
                size="mini">
                <el-option value="1" label="上架"></el-option>
                <el-option value="0" label="下架"></el-option>
              </el-select>
            </el-form-item>
            <Pic :pid.sync="addNewFromData.pid"></Pic>
          </el-form>
        </template>

        <div slot="footer" class="dialog-footer">
          <el-button @click="addAdvertVisible = false">取 消</el-button>
          <el-button type="primary" @click="addAdfunConfirm('addNewFromData')">确
            定</el-button>
        </div>
      </el-dialog>
      <!-- 分页 -->
      <el-pagination class="pagination" background layout="prev, pager, next"
        @current-change="handleCurrentChange" :current-page.sync="currentPage"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
import Pic from '@/components/PictureUpload.vue'
export default {
  data() {
    return {
      doc: '',
      upImgEdit: '',
      tableId: '',
      isGrounding_screen: '',
      pictureClass_screen: '',
      searchData: {},
      pid: '',
      total: null,
      currentPage: 1,
      modleTooglekey: null,
      classifyModleTitle: null,
      editId: '',
      radio1: '广告图分类',
      AdvertisingClass: false,
      dialogEditVisible: false,
      addAdvertVisible: false,
      isGrounding: '',
      overView: [],
      management: [],
      content: [],
      setting: [],
      jueSeName: '',
      multipleSelection: [],
      crumData: {
        breadItem: [{ name: '内容' }, { name: '广告管理' }],
        leadingIn: false,
        leadingOut: false
      },
      classifyAdList: [],
      manageAdList: [],
      dialogFormVisible: false,
      dialogTableVisible: false,
      pictureClass: '1',
      addClassifAdform: {
        name: '',
        en_name: ''
      },
      formLabelWidth: '120px',
      addNewFromData: {
        ad_name: '',
        tid: '',
        pid: '',
        gid: '',
        sort: '',
        display: ''
      },
      NewFromDatarules: {
        ad_name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        tid: [{ required: true, message: '请输入活动名称', trigger: 'change' }],
        // gid: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        sort: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        display: [{ required: true, message: '请输入活动名称', trigger: 'change' }]
      }
    }
  },
  watch: {
    radio1(newValue) {
      this.crumData.breadItem.splice(this.crumData.breadItem.length - 1, 1, { name: newValue })
    }
  },
  methods: {
    // handleCurrentChange(val) {},
    // 删除选中项
    deleteAll() {
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
          this.DELEALLTFUN()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    DELEALLTFUN() {
      let deletIdArr = this.multipleSelection.map(item => {
        return item.id
      })
      let stringdelet = deletIdArr.join(',')
      this.$http({
        method: 'DELETE',
        url: `/ad/deleteAll`,
        params: { ids: stringdelet }
      }).then(res => {
        if (res.code == 200) {
          this.$message({ type: 'success', message: res.message })
          this.manageAdListAPI(this.searchData).then(res => {
            this.manageAdList = res.data.list
            this.total = res.data.total
            if (res.data.list == 0 && this.currentPage > 0) {
              this.currentPage -= 1
              this.manageAdListAPI(this.searchData, this.currentPage).then(res => {
                if (res.code == 200) {
                  this.manageAdList = res.data.list
                  this.total = res.data.total
                }
              })
            }
          })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    deletClassif(row) {
      this.deletClassifAPI(row.id).then(res => {
        if (res.code == 200) {
          this.classifyAdListAPI().then(res => {
            this.classifyAdList = res.data
          })
        }
      })
    },
    addAdfun() {
      this.addAdvertVisible = true
      Object.keys(this.addNewFromData).forEach(item => {
        this.addNewFromData[item] = ''
      })
    },
    editItem(scope) {
      this.tableId = scope.id
      this.addNewFromData.ad_name = scope.ad_name
      this.addNewFromData.tid = scope.tid
      this.addNewFromData.pid = scope.pid
      this.addNewFromData.gid = scope.gid
      this.addNewFromData.sort = scope.sort
      this.addNewFromData.display = scope.display.toString()
      this.dialogEditVisible = true
      this.upImgEdit = scope.path
      console.log(scope.path)
    },
    // 修改广告表单
    editConfirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid && this.addNewFromData.pid !== '') {
          this.$http({
            method: 'PUT',
            url: `/ad${'/' + this.tableId}`,
            params: { ...this.addNewFromData }
          }).then(res => {
            this.dialogEditVisible = false
            if (res.code == 200) {
              this.$message({
                type: 'success',
                message: res.message
              })

              this.manageAdListAPI().then(res => {
                if (res.code == 200) {
                  this.manageAdList = res.data.list
                  this.total = res.data.total
                }
              })
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          this.$message({
            type: 'success',
            message: '失败'
          })
          return false
        }
      })
    },
    // 提交添加广告表单
    addAdfunConfirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid && this.addNewFromData.pid !== '') {
          this.$http({
            method: 'POST',
            url: '/ad/save',
            params: { ...this.addNewFromData }
          }).then(res => {
            this.addAdvertVisible = false
            if (res.code == 200) {
              this.$message({
                type: 'success',
                message: res.message
              })
              this.currentPage = 1
              this.manageAdListAPI().then(res => {
                if (res.code == 200) {
                  this.manageAdList = res.data.list
                  this.total = res.data.total
                }
              })
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          this.$message({
            type: 'success',
            message: '失败'
          })
          return false
        }
      })
    },
    handleCurrentChange(val) {
      this.isGrounding_screen = this.searchData.display
      this.pictureClass_screen = this.searchData.tid
      this.manageAdListAPI(this.searchData, val).then(res => {
        this.manageAdList = res.data.list
        this.total = res.data.total
      })
    },
    addAdClass() {
      this.AdvertisingClass = true
      this.modleTooglekey = 1
      this.classifyModleTitle = '添加分类'
      this.addClassifAdform.name = ''
      this.addClassifAdform.en_name = ''
    },
    classifEdit(row) {
      this.AdvertisingClass = true
      this.modleTooglekey = 2
      this.classifyModleTitle = '编辑分类'
      this.editId = row.id
      console.log(row)
      this.addClassifAdform.name = row.name
      this.addClassifAdform.en_name = row.en_name
    },
    async addClassifFun() {
      let classifyAdList
      if (this.modleTooglekey == 1) {
        let res = await this.addClassifAdformAPI()

        if (res.code == 200) {
          this.$message({ type: 'success', message: res.message })
          this.AdvertisingClass = false
          classifyAdList = await this.classifyAdListAPI()
          if (classifyAdList.code == 200) {
            this.classifyAdListAPI().then(res => {
              this.classifyAdList = res.data
            })
          }
        } else {
          this.$message.error(res.message)
        }
      } else {
        let res = await this.editClassifAdformAPI(this.addClassifAdform, this.editId)
        if (res.code == 200) {
          this.$message({ type: 'success', message: res.message })
          this.AdvertisingClass = false
          classifyAdList = await this.classifyAdListAPI()
          console.log(classifyAdList)
          if (classifyAdList.code == 200) {
            this.classifyAdListAPI().then(res => {
              this.classifyAdList = res.data
            })
          }
        } else {
          this.$message.error(res.message)
        }
      }
    },
    screenFun() {
      // this.searchData={};
      this.searchData.tid = this.pictureClass_screen
      this.searchData.display = this.isGrounding_screen

      this.manageAdListAPI(this.searchData, 1).then(res => {
        if (res.code == 200) {
          this.manageAdList = res.data.list
          this.total = res.data.total
        }
      })
    },
    // 广告分类列表
    classifyAdListAPI() {
      let res = this.$http.get('/ad/type/list')
      return res
    },
    // 广告管理列表
    manageAdListAPI(params = {}, page = this.currentPage) {
      let res = this.$http.get(`/ad/lists${page ? '/' + page : ''}`, { params: { ...params } })
      return res
    },
    // 添加广告类别名Api
    addClassifAdformAPI(params = this.addClassifAdform) {
      let res = this.$http.post('/ad/type', { ...params })
      return res
    },
    // 编辑广告类名Api
    editClassifAdformAPI(params = this.addClassifAdform, editId) {
      let res = this.$http.put(`/ad/type${editId ? '/' + editId : ''}`, { ...params })
      return res
    },
    // 删除广告类名
    deletClassifAPI(id) {
      let res = this.$http({
        method: 'DELETE',
        url: `/ad/type${id ? '/' + id : ''}`
      })
      return res
    },
    async initPage() {
      let classifyAdList = await this.classifyAdListAPI()
      let manageAdList = await this.manageAdListAPI()
      if (classifyAdList.code == 200) {
        this.classifyAdList = classifyAdList.data
      }
      if (manageAdList.code == 200) {
        this.manageAdList = manageAdList.data.list
        this.total = manageAdList.data.total
      }
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
}

.tableContainer {
  padding: 0 15px;
  .tableTitle {
    // display: flex;
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
  max-width: 500px;
  text-align: left;
}
</style>
<template>
  <div class="page">
    <!-- 面包屑 -->
    <Breadcrumb :crumData="crumData"></Breadcrumb>
    <!-- tab -->
    <div class="headGroup">
      <el-radio-group v-model="radio1" size="small">
        <el-radio-button label="广告图分类"></el-radio-button>
        <el-radio-button label="广告图管理"></el-radio-button>
      </el-radio-group>
    </div>
    <!-- 账户管理 -->
    <div v-show="radio1 === '广告图分类'" class="tableContainer">
      <el-row :gutter="5" class="tableTitle">
        <el-col class="addAccount" :span="4">
          <el-button size="small" type="primary"
            @click="AdvertisingClass = true">+
            添加广告类别</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column prop="accountNumber" label="广告图类名">
        </el-table-column>
        <el-table-column prop="operating" label="操作">
          <el-button type="text" size="small" class="delet"
            @click="AdvertisingClass = true">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </el-table-column>
      </el-table>
      <!-- 模态 -->
      <el-dialog width="30%" title="新增分类" :visible.sync="AdvertisingClass">
        <el-form :model="ruleForm" status-icon ref="ruleForm"
          label-width="100px" class="demo-ruleForm">
          <el-form-item label="广告图类名" prop="account">
            <el-input v-model="ruleForm.AdvertisingClassName" size="small"
              autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="AdvertisingClass = false">取 消</el-button>
          <el-button type="primary" @click="confirm('ruleForm')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 分页 -->
      <el-pagination class="pagination" background layout="prev, pager, next"
        :pager-count='17' :total="1000">
      </el-pagination>
    </div>
    <!-- 权限管理 -->
    <div v-show="radio1 === '广告图管理'" class="tableContainer">
      <el-row class="tableTitle">
        <el-col :span="4">
          <el-select size="mini" v-model="pictureClass">
            <el-option value="1" label="全部类型"></el-option>
            <el-option value="2" label="轮播banner图"></el-option>
            <el-option value="3" label="'我的'页广告图"></el-option>
            <el-option value="4" label="'完善信息页'广告图"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-button size="mini" type="primary">删除选中项</el-button>
        </el-col>
        <el-col :span="4">
          <el-button size="mini" type="primary"
            @click="addAdvertVisible = true">+
            添加广告图</el-button>
        </el-col>
      </el-row>
      <el-table :data="JueseTableData" border stripe style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" label="排序" width="50">
        </el-table-column>
        <el-table-column prop="character" label="广告名称">
        </el-table-column>
        <el-table-column class="jueseName" label="广告图类型">
          <template slot="header" slot-scope="{}">
            <el-select v-model="isGrounding" size="mini">
              <el-option value="1" label="轮播banner图"></el-option>
              <el-option value="2" label="'我的'页广告图"></el-option>
              <el-option value="3" label="'完善信息页'广告图"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="havePower" label="广告图片">
        </el-table-column>
        <el-table-column prop="havePower" label="跳转商品ID">
        </el-table-column>
        <el-table-column prop="havePower" label="是否上架">
        </el-table-column>
        <el-table-column prop="operating" label="操作">
          <el-button type="text" size="small" class="delet"
            @click="dialogEditVisible = true">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </el-table-column>
      </el-table>
      <!-- 模态 -->
      <el-dialog width="40%" title="新增角色" :visible.sync="dialogEditVisible">
        <el-form :model="ruleForm" status-icon ref="ruleForm"
          label-width="100px" class="demo-ruleForm">
          <el-form-item class="jueseName" label="排序">
            <el-input v-model="jueSeName" size="small" autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item class="jueseName" label="广告名称">
            <el-input v-model="jueSeName" size="small" autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item class="jueseName" label="广告图类型">
            <el-input v-model="jueSeName" size="small" autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item class="jueseName" label="广告图片">
            <el-input v-model="jueSeName" size="small" autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item class="jueseName" label="跳转商品ID">
            <el-input v-model="jueSeName" size="small" autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item class="jueseName" label="是否上架">
            <!-- <el-input v-model="jueSeName" size="small" autocomplete="off"></el-input> -->
            <el-select v-model="isGrounding">
              <el-option value="1" label="是"></el-option>
              <el-option value="2" label="否"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogEditVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm('ruleForm')">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 添加广告图模态 -->
      <el-dialog width="40%" title="新增角色" :visible.sync="addAdvertVisible">
        <el-form :model="ruleForm" status-icon ref="ruleForm"
          label-width="100px" class="demo-ruleForm">
          <el-form-item class="jueseName" label="广告名称">
            <el-input v-model="jueSeName" size="small" autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item class="jueseName" label="广告图类型">
            <el-select v-model="isGrounding">
              <el-option value="1" label="轮播banner图"></el-option>
              <el-option value="2" label="'我的'页广告图"></el-option>
              <el-option value="3" label="'完善信息页'广告图"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="jueseName" label="广告图片链接">
            <el-input v-model="jueSeName" size="small" autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item class="jueseName" label="跳转商品ID">
            <el-input v-model="jueSeName" size="small" autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item class="jueseName" label="排序">
            <el-input v-model="jueSeName" size="small" autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item class="jueseName" label="是否上架">
            <!-- <el-input v-model="jueSeName" size="small" autocomplete="off"></el-input> -->
            <el-select v-model="isGrounding">
              <el-option value="1" label="是"></el-option>
              <el-option value="2" label="否"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addAdvertVisible = false">取 消</el-button>
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
      multipleSelection: '',
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
      JueseTableData: [
        {
          character: '管理员',
          havePower: '王小虎'
        },
        {
          character: '管理员',
          havePower: '王小虎'
        },
        {
          character: '管理员',
          havePower: '王小虎'
        },
        {
          character: '管理员',
          havePower: '王小虎'
        }
      ],
      dialogFormVisible: false,
      dialogTableVisible: false,
      pictureClass: '',
      ruleForm: {
        AdvertisingClassName: ''
      },
      formLabelWidth: '120px'
    }
  },
  watch: {
    radio1(newValue) {
      this.crumData.breadItem.splice(this.crumData.breadItem.length - 1, 1, { name: newValue })
    }
  },
  methods: {
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
    }
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
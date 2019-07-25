<template>
  <!-- 商家管理 -->
  <div class="page">
    <!-- 面包屑 -->
    <Breadcrumb :crumData="crumData"></Breadcrumb>
    <!-- 账户管理 -->
    <div class="tableContainer">
      <div class="tableTitle">
        <span :span="6" class="calendarContainer fl margin10">
          <DatePicker :pic.sync="searchItem.date"></DatePicker>
        </span>
        <span :span="12" class="searchContainer fl margin10">
          <el-input size="mini" placeholder="请输入内容" v-model="searchValue"
            class="searchInput">
            <el-select v-model="searchSelect" slot="prepend"
              class="searchSelect" placeholder="请选择">
              <el-option label="商家ID" value="account"></el-option>
              <el-option label="商家名称" value="shop_name"></el-option>
              <el-option label="联系人姓名" value="real_name"></el-option>
              <el-option label="联系人手机号" value="phone"></el-option>
              <el-option label="联系人联系地址" value="address"></el-option>
            </el-select>
          </el-input>
        </span>
        <span :span="12" class="searchContainer fl margin10">
          <el-select v-model="searchItem.is_disabled" size="mini"
            placeholder="禁用状态">
            <el-option label="未禁用" value="0">
            </el-option>
            <el-option label="禁用" value="1">
            </el-option>
          </el-select>
        </span>
        <span :span="8" class="fr margin10">
          <el-button size="mini" type="primary" @click="screen">筛选</el-button>
          <el-button size="mini" type="primary" @click="clearScreen">清除筛选
          </el-button>

          <!-- dialogBatchCard = true -->
          <el-button size="mini" type="primary" @click="creatCardsTable">
            批量生成优惠卡</el-button>
          <el-button size="mini" type="primary" @click="addBusiness">
            + 添加商家</el-button>
        </span>
      </div>
      <el-table size="mini" ref="multipleTable" max-height="550"
        @selection-change="handleSelectionChange" :data="tableData" border
        stripe style="width: 100%">
        <el-table-column type="selection" width="35">
        </el-table-column>
        <el-table-column prop="id" label="编号">
        </el-table-column>
        <el-table-column prop="account" label="商家ID">
        </el-table-column>
        <el-table-column prop="shop_name" label="商家名称">
        </el-table-column>
        <el-table-column prop="phone" label="手机号">
        </el-table-column>
        <el-table-column prop="add_time" label="创建时间">
        </el-table-column>
        <el-table-column prop="address" label="门店地址">
        </el-table-column>
        <el-table-column prop="total_card" label="优惠卡总数">
        </el-table-column>
        <el-table-column prop="active_card" label="优惠卡激活总数">
        </el-table-column>

        <!-- <el-table-column prop="character" label="头像">
        </el-table-column> -->
        <el-table-column prop="operating" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editFun(scope.row)">
              编辑</el-button>
            <el-button type="text" size="small" @click="creatAPFun(scope.row)">
              生成优惠卡</el-button>
            <el-button type="text" size="small"
              @click="toUserManager(scope.row)">绑定用户管理
            </el-button>
          </template>
        </el-table-column>

      </el-table>
      <!-- 分页 -->
      <el-pagination class="pagination" background layout="prev, pager, next"
        @current-change="handleCurrentChange" :current-page.sync="currentPage"
        :total="total">
      </el-pagination>
    </div>

    <!-- 添加商家模态框 -->
    <el-dialog width="30%" title="添加商家" :visible.sync="dialogFormVisible">
      <template v-if="dialogFormVisible">
        <el-form :model="BusinessForm" status-icon ref="BusinessForm"
          :rules="rules" label-width="100px" class="demo-ruleForm">
          <!-- 商家名称、联系人姓名、手机号、门店地址、禁用状态 -->
          <el-form-item label="商家名称" prop="shop_name">
            <el-input v-model="BusinessForm.shop_name" size="small"
              autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item label="联系人姓名" prop="real_name">
            <el-input size="small" v-model="BusinessForm.real_name"
              autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item label="联系人手机号" prop="phone">
            <el-input size="small" v-model="BusinessForm.phone"
              autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item label="门店地址" prop="address">
            <el-input type="textarea" size="small"
              v-model="BusinessForm.address" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="禁用状态" prop="is_disabled" class="forbiddenSelect">
            <el-select v-model="BusinessForm.is_disabled" placeholder="请选择">
              <el-option label="已禁用" value="1"></el-option>
              <el-option label="未禁用" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addBusinessConfirm('BusinessForm')">确
          定
        </el-button>
      </div>
    </el-dialog>
    <!-- 编辑商家模态框 -->
    <el-dialog width="30%" title="添加商家" :visible.sync="dialogFormEditVisible">
      <template v-if="dialogFormEditVisible">
        <el-form :model="BusinessForm" status-icon ref="BusinessForm"
          :rules="rules" label-width="100px" class="demo-ruleForm">
          <!-- 商家名称、联系人姓名、手机号、门店地址、禁用状态 -->
          <el-form-item label="商家名称" prop="shop_name">
            <el-input v-model="BusinessForm.shop_name" size="small"
              autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item label="联系人姓名" prop="real_name">
            <el-input size="small" v-model="BusinessForm.real_name"
              autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item label="联系人手机号" prop="phone">
            <el-input size="small" v-model="BusinessForm.phone"
              autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item label="门店地址" prop="address">
            <el-input type="textarea" size="small"
              v-model="BusinessForm.address" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="禁用状态" prop="is_disabled" class="forbiddenSelect">
            <el-select v-model="BusinessForm.is_disabled" placeholder="请选择">
              <el-option label="已禁用" value="1">已禁用</el-option>
              <el-option label="未禁用" value="0">未禁用</el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="editBusinessConfirm('BusinessForm')">确
          定
        </el-button>
      </div>
    </el-dialog>
    <!-- 生成优惠卡 -->
    <el-dialog width="30%" title="生成优惠卡" :visible.sync="dialogCardVisible">
      <div class="card">
        <div class="cardItem">商家ID：<span>{{creatAPData.bid}}</span></div>
        <div class="cardItem">商家名称：<span>{{creatAPData.shop_name}}</span></div>
        <div class="cardItem">
          <div>单张卡金额：</div>
          <el-input v-model="creatAPData.amount" type="number"
            placeholder="请输入卡金额"></el-input>
        </div>
        <div class="cardItem">优惠卡数量：<el-input type="number"
            v-model="creatAPData.total" placeholder="请输入卡数量"></el-input>
        </div>
        <div class="cardItem">
          优惠卡总金额：<span>{{creatAPData.total * creatAPData.amount}}</span></div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="creatAPConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 批量生成优惠卡 -->
    <el-dialog width="60%" title="批量生成优惠卡" :visible.sync="dialogBatchCard">
      <el-table :data="multipleSelection" size="mini" style="width: 100%">
        <el-table-column label="商家ID" prop="account">
        </el-table-column>
        <el-table-column label="商家名称" prop="shop_name">
        </el-table-column>
        <!-- <el-table-column label="单张卡金额" prop="amount">
        </el-table-column> -->
        <el-table-column label="优惠卡数量">
          <template slot-scope="scope">
            <!-- <el-input type="number" v-model="scope.row.total"
              placeholder="请输入卡金额"></el-input> -->
            <el-input-number size="mini" v-model="scope.row.total">
            </el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="单张卡金额">
          <template slot-scope="scope">
            <!-- <el-input type="number" v-model="scope.row.amount"
              placeholder="请输入卡金额"></el-input> -->
            <el-input-number size="mini" v-model="scope.row.amount">
            </el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="优惠卡金总额">
          <template slot-scope="scope">
            {{(scope.row.total*1) * (scope.row.amount*1)}}
            <!-- <el-button @click="handleEdit(scope.$index, scope.row, scope)">bianji</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogBatchCard = false">取 消</el-button>
        <el-button type="primary" @click="cardsFormSend">确认生成</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
import DatePicker from '@/components/DatePicker.vue'
export default {
  data() {
    return {
      creatAPData: {},
      slectInputData: {},
      ID: '',
      BusinessForm: {},
      currentPage: 0,
      searchData: {},
      searchItem: { date: [] },
      total: 0,
      dialogFormVisible: false,
      dialogCardVisible: false,
      dialogBatchCard: false,
      dialogFormEditVisible: false,
      tabtest: true,
      radio1: '账户管理',
      tableSelectValue: '',
      crumData: {
        breadItem: [{ name: '管理' }, { name: '商家管理' }],
        leadingIn: false,
        leadingOut: false
      },
      tableData: [],
      DateP: '',
      value2: '',
      searchValue: '',
      searchSelect: '',
      cardItemMoney: '',
      multipleSelection: [],
      BusinessForm: {
        shop_name: '',
        real_name: '',
        address: '',
        is_disabled: '',
        phone: ''
      },
      rules: {
        shop_name: [{ required: true, message: '内容不可为空', trigger: 'blur' }],
        real_name: [{ required: true, message: '内容不可为空', trigger: 'blur' }],
        address: [{ required: true, message: '内容不可为空', trigger: 'blur' }],
        is_disabled: [{ required: true, message: '内容不可为空', trigger: 'change' }]
      },
      forbidden: ''
    }
  },
  watch: {
    radio1(newValue) {
      this.crumData = [{ name: '设置' }, { name: '账户权限' }, { name: newValue }]
    },
    creatAPData: {
      handler(newValue, oldValue) {
        if (Number(newValue.amount) < 0) {
          this.creatAPData.amount = '0'
        }
        if (Number(newValue.total) < 1) {
          this.creatAPData.total = '1'
        }
      },
      deep: true
    },
    multipleSelection: {
      handler(newValue, oldValue) {
        console.log(newValue)
        newValue.forEach(item => {
          if (item.total < 1) {
            item.total = 1
          }
          if (item.amount < 0) {
            item.amount = 0
          }
        })
      },
      deep: true
    }
  },
  methods: {
    // 批量生成优惠卡表单提交
    cardsFormSend() {
      this.multipleSelection.forEach(item => {
        item.bid = item.id
        for (let key in item) {
          if (key !== 'bid' && key !== 'amount' && key !== 'total') {
            delete item[key]
          }
        }
      })
      this.$http({
        method: 'post',
        url: '/business/cards',
        params: {
          data: this.multipleSelection
        }
      }).then(res => {
        if (res.code == 200) {
          this.dialogBatchCard = false
          this.$message({ type: 'success', message: res.message })
          this.BusinessListsApi(this.searchData, this.currentPage)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 生成优惠卡表单提交
    creatAPConfirm() {
      this.$http({
        method: 'POST',
        url: `/business/card`,
        params: {
          ...this.creatAPData
        }
      }).then(res => {
        if (res.code == 200) {
          this.dialogCardVisible = false
          this.BusinessListsApi(this.searchData, this.currentPage)
          this.$message({ type: 'success', message: res.message })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 生成优惠卡
    creatAPFun(row) {
      this.dialogCardVisible = true
      this.creatAPData = { amount: 0, total: 1, bid: row.id, shop_name: row.shop_name }
    },
    // 编辑商户
    editFun(row) {
      this.dialogFormEditVisible = true
      this.ID = row.id
      this.BusinessForm.shop_name = row.shop_name
      this.BusinessForm.real_name = row.real_name
      this.BusinessForm.address = row.address
      this.BusinessForm.is_disabled = row.is_disabled.toString()
      this.BusinessForm.phone = row.phone
    },
    // 编辑商户表单提交
    editBusinessConfirm(formname) {
      this.$refs[formname].validate(valid => {
        if (valid) {
          this.$http({
            method: 'PUT',
            url: `/business/${this.ID}`,
            params: {
              ...this.BusinessForm
            }
          }).then(res => {
            if (res.code == 200) {
              this.dialogFormEditVisible = false
              this.$message({ type: 'success', message: res.message })
              this.BusinessListsApi(this.searchData, this.currentPage)
            } else {
              this.dialogFormEditVisible = true
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    // 添加商户
    addBusiness() {
      this.dialogFormVisible = true
      this.BusinessForm = {}
    },
    // 筛选
    screen() {
      this.currentPage = 1
      this.slectInputData = { [this.searchSelect]: this.searchValue }
      this.searchData = { ...this.slectInputData, ...this.searchItem }
      this.BusinessListsApi(this.searchData)
    },
    // 清空筛选
    clearScreen() {
      this.searchData = {}
      this.slectInputData = {}
      this.searchSelect = ''
      this.searchValue = ''
      this.searchItem = {}
      this.searchItem.date = []
      this.currentPage = 1
      this.BusinessListsApi(this.searchData)
    },
    handleCurrentChange(val) {
      this.searchItem.date = this.searchData.date
      if (JSON.stringify(this.slectInputData) != '{}') {
        this.searchSelect = Object.keys(this.slectInputData)[0]
        this.searchValue = this.slectInputData[this.searchSelect]
      } else {
        this.searchValue = ''
        this.searchSelect = ''
      }

      this.BusinessListsApi(this.searchData, val)
    },
    // 批量生成优惠卡
    creatCardsTable() {
      if (this.multipleSelection.length == 0) {
        this.$message.error('请选择商户')
        return
      }
      this.dialogBatchCard = true
    },
    // 选择列表条目
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    toUserManager(row) {
      this.$router.push({ name: 'userManager', params: { account: row.account, id: row.id, name: row.shop_name } })
    },
    // 表单列表
    BusinessListsApi(params, page = this.currentPage) {
      this.$http({
        method: 'get',
        url: `/business/lists${page ? '/' + page : ''}`,
        params: { ...params }
      }).then(res => {
        if (res.code == 200) {
          res.data.list.forEach((item, index) => {
            item.amount = 0
            item.total = 1
          })
          this.tableData = res.data.list
          this.total = res.data.total
        }
      })
    },
    // 添加商家提交表单函数
    addBusinessConfirm(formname) {
      this.$refs[formname].validate(valid => {
        if (valid) {
          this.$http({
            method: 'post',
            url: `/business/save`,
            params: {
              ...this.BusinessForm
            }
          }).then(res => {
            if (res.code == 200) {
              this.dialogFormVisible = false
              this.$message({ type: 'success', message: res.message })
              this.initPage()
            } else {
              this.dialogFormVisible = true
              this.$message(res.message)
            }
          })
        }
      })
    },
    async initPage() {
      await this.BusinessListsApi()
    }
  },
  mounted() {
    this.initPage()
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
  max-width: 200px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.calendarContainer {
  display: flex;
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

.card {
  text-align: left;
  .cardItem {
    line-height: 60px;
    height: 60px;
    display: flex;
    justify-content: flex-start;
    .el-input {
      width: 60%;
    }
  }
}

.forbiddenSelect .el-select {
  width: 100%;
}
</style>

<style>
.searchContainer .searchInput .el-input-group__prepend {
  background: #fff;
}
</style>
